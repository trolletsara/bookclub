import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - körs före varje request
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - körs efter varje response
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Centraliserad error handling
    if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ Network Error: No response received');
    } else {
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
