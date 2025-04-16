// Essential interfaces used in the application
export interface PowerStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

// Needed for API responses which return stats as strings
export interface PowerStatsString {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface Biography {
  'full-name': string;
  fullName: string;
  'alter-egos': string;
  alterEgos: string;
  aliases: string[];
  'place-of-birth': string;
  placeOfBirth: string;
  'first-appearance': string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

export interface Appearance {
  gender: string;
  race: string;
  'eye-color': string;
  eyeColor: string;
  'hair-color': string;
  hairColor: string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Connections {
  'group-affiliation': string;
  groupAffiliation: string;
  relatives: string;
}

export interface Image {
  url: string;
}

// Export BaseResponse for reusability
export interface BaseResponse {
  response: 'success' | 'error';
  error?: string;
}

// Core Superhero data structure
export interface SuperheroBase {
  id: string;
  name: string;
}

// Complete Superhero type
export interface Superhero extends SuperheroBase, BaseResponse {
  powerstats: PowerStats;
  biography: Biography;
  appearance: Appearance;
  work: Work;
  connections: Connections;
  image: Image;
}

export interface SearchResponse extends BaseResponse {
  'results-for'?: string;
  resultsFor?: string;
  results?: Superhero[];
}

// API response type
export interface SuperheroResponse extends BaseResponse {
  // Base properties that are commonly available
  id?: string;
  name?: string;
  
  // Specific resource types that might be returned individually
  powerstats?: PowerStats | PowerStatsString;
  biography?: Partial<Biography>;
  appearance?: Partial<Appearance>;
  work?: Partial<Work>;
  connections?: Partial<Connections>;
  image?: Image;
}

// Utility function for converting string stats to numbers
export const convertPowerStats = (statsString: PowerStatsString): PowerStats => {
  return {
    intelligence: parseInt(statsString.intelligence) || 0,
    strength: parseInt(statsString.strength) || 0,
    speed: parseInt(statsString.speed) || 0,
    durability: parseInt(statsString.durability) || 0,
    power: parseInt(statsString.power) || 0,
    combat: parseInt(statsString.combat) || 0
  };
}; 