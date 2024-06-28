import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const movies = await fetchMovies(page);
                setMovies(movies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the movies:', error);
                setError(error);
                setLoading(false);
            }
        };

        getMovies();
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!movies || movies.length === 0) return <div>No movies found</div>;

    return (
        <div>
            {movies.map((movie) => {
                const movieTitle = movie.name || movie.alternativeName;
                if (!movieTitle) return null;
                return (
                    <div key={movie.id}>
                        <img src={movie.poster?.previewUrl} alt={movieTitle} />
                        <h2>{movieTitle}</h2>
                        <p>{movie.year}</p>
                        <p>{movie.rating?.kp}</p>
                    </div>
                );
            })}
            <button onClick={() => setPage(page + 1)}>Next Page</button>
        </div>
    );
};

export default MovieList;
