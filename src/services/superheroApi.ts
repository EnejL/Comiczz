import axios from 'axios';
import { SearchResponse, SuperheroResponse } from '../types/superhero';

const API_BASE_URL = 'https://superheroapi.com/api';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_TOKEN = process.env.REACT_APP_SUPERHERO_API_TOKEN;

if (!API_TOKEN) {
  throw new Error('Superhero API token is not configured. Please set REACT_APP_SUPERHERO_API_TOKEN in your .env file.');
}

const api = axios.create({
  baseURL: `${CORS_PROXY}${API_BASE_URL}/${API_TOKEN}`,
  headers: {
    'Origin': 'http://localhost:3000',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Enhanced delay function with exponential backoff
const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Rate limiting configuration
const rateLimitConfig = {
  baseDelay: 1000,  // Base delay of 1 second
  maxDelay: 10000,  // Maximum delay of 10 seconds
  maxRetries: 3,    // Maximum number of retries
};

// Enhanced request handler with exponential backoff
const makeRequestWithRetry = async <T>(
  requestFn: () => Promise<T>,
  retryCount = 0
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error: any) {
    if (error.response?.status === 429 && retryCount < rateLimitConfig.maxRetries) {
      const backoffDelay = Math.min(
        rateLimitConfig.baseDelay * Math.pow(2, retryCount),
        rateLimitConfig.maxDelay
      );
      
      console.log(`Rate limit hit. Retrying in ${backoffDelay}ms... (Attempt ${retryCount + 1}/${rateLimitConfig.maxRetries})`);
      await delay(backoffDelay);
      return makeRequestWithRetry(requestFn, retryCount + 1);
    }
    throw error;
  }
};

// Enhanced getHeroesBatch with better rate limiting
export const getHeroesBatch = async (startId: number, batchSize: number): Promise<SuperheroResponse[]> => {
  const results: SuperheroResponse[] = [];
  
  for (let i = 0; i < batchSize; i++) {
    const currentId = startId + i;
    try {
      const result = await makeRequestWithRetry(() => getHeroById(currentId));
      results.push(result);
      // Add a small delay between successful requests to prevent rate limiting
      if (i < batchSize - 1) await delay(rateLimitConfig.baseDelay);
    } catch (error: any) {
      console.error(`Failed to fetch hero ${currentId}:`, error.message);
      // Add a placeholder for failed requests to maintain batch size
      results.push({
        response: 'error',
        error: error.message,
        id: currentId.toString()
      } as SuperheroResponse);
    }
  }
  
  return results;
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

// Enhanced getHeroById with better error handling
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