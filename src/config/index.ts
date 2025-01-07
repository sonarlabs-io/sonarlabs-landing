export const API_URL = process.env.API_URL;

// Add some debug logging
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode, API_URL:', process.env.API_URL);
} else {
  console.log('Running in development mode, API_URL:', process.env.API_URL);
}