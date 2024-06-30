import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import '../MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <img className="movie-poster" src={movie.poster?.previewUrl} alt={movie.name} />
            <div className="movie-info">
                <h2>{movie.name}</h2>
                <p className="description">{movie.description}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Rating:</strong> {movie.rating?.kp}</p>
                <p><strong>Premiere:</strong> {new Date(movie.premiere?.world).toLocaleDateString()}</p>
                <div className="genres">
                    <strong>Genres: </strong>
                    {movie.genres.map((genre) => genre.name).join(', ')}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
