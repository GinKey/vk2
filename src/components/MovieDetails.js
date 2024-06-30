import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import '../MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setLoading(true);
                const movie = await fetchMovieDetails(id);
                setMovie(movie);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the movie details:', error);
                setLoading(false);
            }
        };

        getMovieDetails();
    }, [id]);


    const isFavorite = favorites.some(fav => fav.id === movie?.id);

    const toggleFavorite = () => {
        let newFavorites;
        if (isFavorite) {
            newFavorites = favorites.filter(fav => fav.id !== movie.id);
        } else {
            newFavorites = [...favorites, movie];
        }
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    if (loading) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <img className="movie-poster" src={movie.poster?.previewUrl} alt={movie.name} />
            <div className="movie-info">
                <h2>{movie.name}</h2>
                <p className="description">{movie.description}</p>
                <p><strong>Год:</strong> {movie.year}</p>
                <p><strong>Рейтинг:</strong> {movie.rating?.kp}</p>
                <div className="genres">
                    <strong>Жанры: </strong>
                    {movie.genres.map((genre) => genre.name).join(', ')}
                </div>
                <button className="favorite-button" onClick={toggleFavorite}>
                    {isFavorite ? 'Удалить из избранных' : 'Добавить в избранное'}
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
