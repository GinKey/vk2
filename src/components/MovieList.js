import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../services/api';
import Logo from './Logo';
import '../styles.css';

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

    if (loading) return <div className="centered">Loading...</div>;
    if (error) return <div className="centered">Error: {error.message}</div>;
    if (!movies || movies.length === 0) return <div className="centered">No movies found</div>;

    return (
        <div>
            <Logo />
            <div className="movie-list">
                {movies.map((movie) => {
                    const movieTitle = movie.name || movie.alternativeName;
                    if (!movieTitle) return null;
                    return (
                        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-item-link">
                            <div className="movie-item">
                                <img src={movie.poster?.previewUrl} alt={movieTitle} className="movie-poster" />
                                <h2>{movieTitle}</h2>
                                <p>{movie.year}</p>
                                <p>{movie.rating?.kp}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <button onClick={() => setPage(page + 1)} className="next-page-button">Next Page</button>
        </div>
    );
};

export default MovieList;
