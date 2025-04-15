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

// Helper function to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getHeroesBatch = async (startId: number, count: number): Promise<SuperheroResponse[]> => {
  try {
    const heroIds = Array.from({ length: count }, (_, i) => startId + i);
    const results: SuperheroResponse[] = [];

    // Process heroes one at a time with delay
    for (const id of heroIds) {
      const result = await getHeroById(id);
      results.push(result);
      // Add a 1-second delay between requests
      await delay(1000);
    }

    return results;
  } catch (error) {
    console.error('Failed to fetch heroes batch:', error);
    return [];
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

export const getHeroById = async (id: string | number): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      // If we hit rate limit, wait 2 seconds and try again
      await delay(2000);
      return getHeroById(id);
    }
    return {
      response: 'error',
      error: error instanceof Error ? error.message : 'Failed to fetch hero details'
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