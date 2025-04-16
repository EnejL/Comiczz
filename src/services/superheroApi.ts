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

// Cache with localStorage persistence
const CACHE_KEY = 'superhero_cache';
let cache: Record<string, any> = {};

// Load cache from localStorage on initialization
try {
  const savedCache = localStorage.getItem(CACHE_KEY);
  if (savedCache) {
    cache = JSON.parse(savedCache);
    console.log(`Loaded ${Object.keys(cache).length} heroes from cache`);
  }
} catch (error) {
  console.warn('Failed to load cache from localStorage:', error);
}

// Save cache to localStorage
const saveCache = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
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

// Enhanced request handler with exponential backoff and caching
const makeRequestWithRetry = async <T>(
  requestFn: () => Promise<T>,
  cacheKey?: string,
  retryCount = 0
): Promise<T> => {
  // Check cache first if cacheKey provided
  if (cacheKey && cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const result = await requestFn();
    
    // Store in cache if cacheKey provided
    if (cacheKey) {
      cache[cacheKey] = result;
      debouncedSaveCache();
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

export const getHeroPowerstats = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}/powerstats`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero powerstats'
    };
  }
};

export const getHeroBiography = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}/biography`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero biography'
    };
  }
};

export const getHeroAppearance = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}/appearance`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero appearance'
    };
  }
};

export const getHeroWork = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}/work`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero work'
    };
  }
};

export const getHeroConnections = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}/connections`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero connections'
    };
  }
};

export const getHeroImage = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}/image`);
    return response.data;
  } catch (error) {
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero image'
    };
  }
}; 