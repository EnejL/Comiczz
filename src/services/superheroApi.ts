import axios from 'axios';
import { SearchResponse, SuperheroResponse } from '../types/superhero';

const API_BASE_URL = '/api';
const API_TOKEN = process.env.REACT_APP_SUPERHERO_API_TOKEN;

if (!API_TOKEN) {
  throw new Error('Superhero API token is not configured. Please set REACT_APP_SUPERHERO_API_TOKEN in your .env file.');
}

const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_TOKEN}`
});

// Define resource types
type ResourceType = 'powerstats' | 'biography' | 'appearance' | 'work' | 'connections' | 'image';

// Cache with localStorage persistence and expiration
interface CacheEntry<T> {
  data: T;
  expires: number;
  dirty?: boolean;
}

const CACHE_KEY = 'superhero_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000;
let cache: Record<string, CacheEntry<any>> = {};
let dirtyKeys: Set<string> = new Set();

// Load cache from localStorage on initialization
try {
  const savedCache = localStorage.getItem(CACHE_KEY);
  if (savedCache) {
    const parsedCache = JSON.parse(savedCache);
    const now = Date.now();
    
    // Filter out expired entries
    cache = Object.entries(parsedCache).reduce((acc, [key, entry]) => {
      if ((entry as CacheEntry<any>).expires > now) {
        acc[key] = entry as CacheEntry<any>;
      }
      return acc;
    }, {} as Record<string, CacheEntry<any>>);
  }
} catch (error) {
  console.warn('Failed to load cache from localStorage:', error);
}

// Save only dirty cache entries to localStorage
const saveCache = () => {
  try {
    if (dirtyKeys.size === 0) return;
    
    // Get existing cache from localStorage
    const existingCacheStr = localStorage.getItem(CACHE_KEY);
    let existingCache: Record<string, CacheEntry<any>> = {};
    
    if (existingCacheStr) {
      existingCache = JSON.parse(existingCacheStr);
    }
    
    // Update only dirty entries
    dirtyKeys.forEach(key => {
      if (cache[key]) {
        existingCache[key] = cache[key];
        // Clear dirty flag
        cache[key].dirty = false;
      } else {
        // Item removed from cache
        delete existingCache[key];
      }
    });
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(existingCache));
    dirtyKeys.clear();
  } catch (error) {
    console.warn('Failed to save cache to localStorage:', error);
  }
};

// Debounced save to avoid excessive writes
let saveCacheTimeout: NodeJS.Timeout | null = null;
const debouncedSaveCache = () => {
  if (saveCacheTimeout) {
    clearTimeout(saveCacheTimeout);
  }
  saveCacheTimeout = setTimeout(() => {
    saveCache();
    saveCacheTimeout = null;
  }, 1000);
};

// Enhanced delay function with exponential backoff
const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Rate limits
const rateLimitConfig = {
  baseDelay: 200,
  maxDelay: 2000,
  maxRetries: 3,
  concurrentRequests: 6
};

// Add to cache with expiration
const addToCache = <T>(key: string, data: T): void => {
  cache[key] = {
    data,
    expires: Date.now() + CACHE_TTL,
    dirty: true
  };
  dirtyKeys.add(key);
  debouncedSaveCache();
};

// Enhanced request handler with exponential backoff and caching
const makeRequestWithRetry = async <T>(
  requestFn: () => Promise<T>,
  cacheKey?: string,
  retryCount = 0
): Promise<T> => {
  // Check cache first if cacheKey provided
  if (cacheKey && cache[cacheKey]) {
    // Return cached data if not expired
    const now = Date.now();
    if (cache[cacheKey].expires > now) {
      return cache[cacheKey].data;
    } else {
      // Remove expired entry
      delete cache[cacheKey];
      dirtyKeys.add(cacheKey);
    }
  }

  try {
    const result = await requestFn();
    
    // Store in cache if cacheKey provided
    if (cacheKey) {
      addToCache(cacheKey, result);
    }
    
    return result;
  } catch (error: any) {
    if ((error.response?.status === 429 || error.response?.status === 403) && retryCount < rateLimitConfig.maxRetries) {
      const backoffDelay = Math.min(
        rateLimitConfig.baseDelay * Math.pow(2, retryCount),
        rateLimitConfig.maxDelay
      );
      
      console.log(`Rate limit hit. Retrying in ${backoffDelay}ms... (Attempt ${retryCount + 1}/${rateLimitConfig.maxRetries})`);
      await delay(backoffDelay);
      return makeRequestWithRetry(requestFn, cacheKey, retryCount + 1);
    }
    throw error;
  }
};

// Process requests in chunks with optimized concurrency
const processInChunks = async <T>(
  items: number[],
  processor: (id: number) => Promise<T>,
  chunkSize: number
): Promise<T[]> => {
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(
      chunk.map(item => makeRequestWithRetry(
        () => processor(item), 
        `hero-${item}`
      ))
    );
    results.push(...chunkResults);
    
    if (i + chunkSize < items.length) {
      await delay(rateLimitConfig.baseDelay / 2);
    }
  }
  
  return results;
};

export const getHeroesBatch = async (startId: number, batchSize: number): Promise<SuperheroResponse[]> => {
  const ids = Array.from({ length: batchSize }, (_, i) => startId + i);
  return processInChunks(ids, getHeroById, rateLimitConfig.concurrentRequests);
};

export const getHeroById = async (id: number): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return {
        response: 'error',
        error: 'Hero not found',
        id: id.toString()
      } as SuperheroResponse;
    }
    throw error;
  }
};

export const searchHeroes = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await api.get<SearchResponse>(`/search/${query}`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to search heroes'
    };
  }
};

// Generic function to replace redundant methods
export const getHeroResource = async (id: string, resource?: ResourceType): Promise<SuperheroResponse> => {
  const endpoint = resource ? `/${id}/${resource}` : `/${id}`;
  const cacheKey = resource ? `hero-${id}-${resource}` : `hero-${id}`;
  
  try {
    const response = await makeRequestWithRetry(
      () => api.get<SuperheroResponse>(endpoint),
      cacheKey
    );
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : `Failed to fetch hero ${resource || 'data'}`
    };
  }
};

// Maintain backward compatibility with existing code
export const getHeroPowerstats = async (id: string): Promise<SuperheroResponse> => 
  getHeroResource(id, 'powerstats');

export const getHeroBiography = async (id: string): Promise<SuperheroResponse> => 
  getHeroResource(id, 'biography');

export const getHeroAppearance = async (id: string): Promise<SuperheroResponse> => 
  getHeroResource(id, 'appearance');

export const getHeroWork = async (id: string): Promise<SuperheroResponse> => 
  getHeroResource(id, 'work');

export const getHeroConnections = async (id: string): Promise<SuperheroResponse> => 
  getHeroResource(id, 'connections');

export const getHeroImage = async (id: string): Promise<SuperheroResponse> => 
  getHeroResource(id, 'image'); 