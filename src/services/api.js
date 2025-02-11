import axios from 'axios';
import qs from 'qs';


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.kinopoisk.dev/v1.4';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-API-KEY': API_KEY,
    },
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    },
});

export const fetchMovies = async (page = 1, selectedGenres = [], ratingRange = [5, 10], yearRange = [1990, new Date().getFullYear()]) => {
    try {
        const params = {
            limit: 50,
            page,
            notNullFields: ['id', 'name', 'rating.kp', 'logo.url'],
            'rating.kp': `${ratingRange[0]}-${ratingRange[1]}`,
            sortField: ['rating.kp'],
            sortType: ['-1'],
            type: ['movie']
        };

        if (selectedGenres.length > 0) {
            params['genres.name'] = selectedGenres
        }

        if (yearRange) {
            params.year = `${yearRange[0]}-${yearRange[1]}`;
        }

        const response = await api.get('/movie', { params });
        console.log('API Response:', response.data);
        return response.data.docs || [];
    } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await api.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};
