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
    const [genres, setGenres] = useState(['драма', 'комедия', 'боевик', 'ужасы', 'фантастика']); // Пример жанров на русском
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [ratingRange, setRatingRange] = useState([5, 10]);
    const [yearRange, setYearRange] = useState([1990, new Date().getFullYear()]);

    const [tempSelectedGenres, setTempSelectedGenres] = useState([]);
    const [tempRatingRange, setTempRatingRange] = useState([5, 10]);
    const [tempYearRange, setTempYearRange] = useState([1990, new Date().getFullYear()]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const movies = await fetchMovies(page, selectedGenres, ratingRange, yearRange);
                setMovies(movies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the movies:', error);
                setError(error);
                setLoading(false);
            }
        };

        getMovies();
    }, [page, selectedGenres, ratingRange, yearRange]);

    const handleGenreChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setTempSelectedGenres([...tempSelectedGenres, value]);
        } else {
            setTempSelectedGenres(tempSelectedGenres.filter((genre) => genre !== value));
        }
    };

    const handleRatingChange = (event) => {
        const { name, value } = event.target;
        setTempRatingRange((prevRange) => {
            return name === 'min' ? [Number(value), prevRange[1]] : [prevRange[0], Number(value)];
        });
    };

    const handleYearChange = (event) => {
        const { name, value } = event.target;
        setTempYearRange((prevRange) => {
            return name === 'start' ? [Number(value), prevRange[1]] : [prevRange[0], Number(value)];
        });
    };

    const applyFilters = () => {
        setSelectedGenres(tempSelectedGenres);
        setRatingRange(tempRatingRange);
        setYearRange(tempYearRange);
    };

    if (loading) return <div className="centered">Loading...</div>;
    if (error) return <div className="centered">Error: {error.message}</div>;
    if (!movies || movies.length === 0) return <div className="centered">No movies found</div>;

    return (
        <div>
            <Logo />
            <div className="filters">
                <div>
                    <h3>Жанры</h3>
                    {genres.map((genre) => (
                        <label key={genre}>
                            <input
                                type="checkbox"
                                value={genre}
                                checked={tempSelectedGenres.includes(genre)}
                                onChange={handleGenreChange}
                            />
                            {genre}
                        </label>
                    ))}
                </div>
                <div>
                    <h3>Рейтинг</h3>
                    <label>
                        мин:
                        <input
                            type="number"
                            name="min"
                            value={tempRatingRange[0]}
                            onChange={handleRatingChange}
                            min="0"
                            max="10"
                        />
                    </label>
                    <label>
                        макс:
                        <input
                            type="number"
                            name="max"
                            value={tempRatingRange[1]}
                            onChange={handleRatingChange}
                            min="0"
                            max="10"
                        />
                    </label>
                </div>
                <div>
                    <h3>Год</h3>
                    <label>
                        Начало:
                        <input
                            type="number"
                            name="start"
                            value={tempYearRange[0]}
                            onChange={handleYearChange}
                            min="1990"
                            max={new Date().getFullYear()}
                        />
                    </label>
                    <label>
                        Конец:
                        <input
                            type="number"
                            name="end"
                            value={tempYearRange[1]}
                            onChange={handleYearChange}
                            min="1990"
                            max={new Date().getFullYear()}
                        />
                    </label>
                </div>
                <button onClick={applyFilters} className="apply-filters-button">Применить фильтры</button>
            </div>
            <div className="movie-list">
                {movies.map((movie) => {
                    const movieTitle = movie.name || movie.alternativeName;
                    if (!movieTitle) return null;
                    return (
                        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-item">
                            <img src={movie.poster?.previewUrl} alt={movieTitle} className="movie-poster" />
                            <h2>{movieTitle}</h2>
                            <p>{movie.year}</p>
                            <p>{movie.rating?.kp}</p>
                        </Link>
                    );
                })}
            </div>
            <button onClick={() => setPage(page + 1)} className="next-page-button">Следующая страница</button>
        </div>
    );
};

export default MovieList;
