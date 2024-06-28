import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';

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
        <div>
            <img src={movie.poster?.previewUrl} alt={movie.name} />
            <h2>{movie.name}</h2>
            <p>{movie.description}</p>
            <p>{movie.year}</p>
            <p>{movie.rating?.kp}</p>
            <p>{movie.premiere?.world}</p>
        </div>
    );
};

export default MovieDetails;
