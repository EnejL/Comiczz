import axios from 'axios';
import { SearchResponse, SuperheroResponse, Superhero } from '../types/superhero';

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

export const getHeroById = async (id: string): Promise<SuperheroResponse> => {
  try {
    const response = await api.get<SuperheroResponse>(`/${id}`);
    return response.data;
  } catch (error) {
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