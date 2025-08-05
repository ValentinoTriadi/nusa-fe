import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Create axios instance configured for Better Auth
const axiosClient: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL + '/api' || 'https://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for Better Auth cookies
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add CSRF token if available
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.log('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', response.status, response.config.url);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.log('API Error:', error.response?.status, error.config?.url);
    console.log('Error Data:', error.response);

    // Handle common error cases for Better Auth
    if (error.response?.status === 401) {
      // Handle unauthorized - Better Auth will handle redirect
      console.warn('Unauthorized access');
      // Don't automatically redirect, let the app handle it
    }

    if (error.response?.status === 403) {
      // Handle forbidden
      console.warn('Access forbidden');
    }

    if (error.response?.status >= 500) {
      // Handle server errors
      console.log('Server error occurred');
    }

    return Promise.reject(error);
  },
);

// Helper function to get CSRF token
function getCSRFToken(): string | null {
  if (typeof document === 'undefined') return null;

  // Try to get from meta tag first
  const metaTag = document.querySelector(
    'meta[name="csrf-token"]',
  ) as HTMLMetaElement;
  if (metaTag) {
    return metaTag.content;
  }

  // Try to get from cookie
  const match = document.cookie.match(/csrf-token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Helper function to update base URL if needed
export const updateBaseURL = (baseURL: string) => {
  axiosClient.defaults.baseURL = baseURL;
};

// Helper function to set additional headers (for SSR scenarios)
export const setServerSideHeaders = (headers: Record<string, string>) => {
  Object.assign(axiosClient.defaults.headers.common, headers);
};

// Helper function to set cookies for SSR
export const setServerSideCookies = (cookie: string) => {
  axiosClient.defaults.headers.common['Cookie'] = cookie;
};

export default axiosClient;
