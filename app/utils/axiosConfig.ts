'use client';

import axios from 'axios';
import { accessTokenRefresher } from './accessTokenRefresher';

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: `${process.env.NEXT_PUBLIC_API_URL_BASE}`, // Replace with your base URL
  withCredentials: true, // Ensures credentials are included with all requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Access localStorage dynamically to avoid SSR issues
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const email = localStorage.getItem('email');

      // Add headers conditionally
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      if (email) {
        config.headers.email = email;
      }
    }

    // Add static headers
    config.headers.client = 'web';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Perform actions on the successful response
    if (response.data?.response?.access_token) {
      accessTokenRefresher(response.data.response.access_token);
    }

    // if (typeof window !== 'undefined') {
    //   const accessToken = localStorage.getItem('accessToken');
    //   const email = localStorage.getItem('email');

    //   // Add headers conditionally
    //   if (accessToken) {
    //     config.headers.Authorization = `Bearer ${accessToken}`;
    //   }
    //   if (email) {
    //     config.headers.email = email;
    //   }
    // }

    return response;
  },
  (error) => {
    // Perform actions on the failed response
    if (error.response) {
      console.error('Error response:', error.response);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }

    // Optionally handle specific status codes
    // if (error.response?.status === 401) {
    //   console.log('Unauthorized! Redirecting to login...');

    //   const currentPath = window.location.pathname; // Get the current route

    //   if (currentPath.includes('admin')) {
    //     window.location.href = '/admin/log-in';
    //   } else {
    //     window.location.href = '/log-in';
    //   }
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
