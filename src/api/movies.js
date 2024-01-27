import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'd820b0a1af251d95ab4309bc7eecf77f',
    language: 'en-US',
  },
});

export const getTrendingMovies = () => {
  return instance.get('/trending/movie/day');
};

export const getSearchingMovies = query => {
  return instance.get(`/search/movie?query=${query}`);
};

export const getMovieDetails = movieId => {
  return instance.get(`/movie/${movieId}`);
};

export const getMovieCredits = movieId => {
  return instance.get(`/movie/${movieId}/credits`);
};

export const getMovieReviews = movieId => {
  return instance.get(`/movie/${movieId}/reviews`, {
    params: {
      page: 1,
    },
  });
};
