import { Platform } from 'react-native';

// Base API configuration
const API_CONFIG = {
  BASE_URL: 'https://api.example.com', // Replace with your actual API URL
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Error types
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Timeout promise
const timeoutPromise = (ms: number) => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError());
    }, ms);
  });
};

// Main fetch function with timeout
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    timeoutPromise(timeout),
  ]);
};

// Process response
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || `API error with status ${response.status}`,
      response.status,
      data
    );
  }
  
  return data;
};

// API client
const api = {
  get: async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    try {
      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      const response = await fetchWithTimeout(
        url,
        {
          ...options,
          method: 'GET',
          headers: {
            ...API_CONFIG.HEADERS,
            ...options.headers,
          },
        },
        API_CONFIG.TIMEOUT
      );
      
      return handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof TimeoutError) {
        throw error;
      }
      throw new NetworkError();
    }
  },
  
  post: async <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
    try {
      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      const response = await fetchWithTimeout(
        url,
        {
          ...options,
          method: 'POST',
          headers: {
            ...API_CONFIG.HEADERS,
            ...options.headers,
          },
          body: JSON.stringify(data),
        },
        API_CONFIG.TIMEOUT
      );
      
      return handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof TimeoutError) {
        throw error;
      }
      throw new NetworkError();
    }
  },
  
  put: async <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
    try {
      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      const response = await fetchWithTimeout(
        url,
        {
          ...options,
          method: 'PUT',
          headers: {
            ...API_CONFIG.HEADERS,
            ...options.headers,
          },
          body: JSON.stringify(data),
        },
        API_CONFIG.TIMEOUT
      );
      
      return handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof TimeoutError) {
        throw error;
      }
      throw new NetworkError();
    }
  },
  
  delete: async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    try {
      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      const response = await fetchWithTimeout(
        url,
        {
          ...options,
          method: 'DELETE',
          headers: {
            ...API_CONFIG.HEADERS,
            ...options.headers,
          },
        },
        API_CONFIG.TIMEOUT
      );
      
      return handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof TimeoutError) {
        throw error;
      }
      throw new NetworkError();
    }
  },
};

export default api;