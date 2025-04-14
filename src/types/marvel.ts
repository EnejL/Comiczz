export interface MarvelResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: ComicFormat;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];
  series: {
    resourceURI: string;
    name: string;
  };
  variants: {
    resourceURI: string;
    name: string;
  }[];
  dates: {
    type: string;
    date: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
  creators: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role?: string;
    }[];
    returned: number;
  };
}

export type ComicFormat = 
  | 'Comic'
  | 'Magazine'
  | 'Trade Paperback'
  | 'Hardcover'
  | 'Digest'
  | 'Graphic Novel'
  | 'Digital Comic'
  | 'Infinite Comic';

export interface ComicDetails {
  title: string;
  releaseDate: string;
  format: string;
  pages: number;
  characters: string[];
  creators: Array<{
    name: string;
    role: string;
  }>;
  diamondCode: string;
} 