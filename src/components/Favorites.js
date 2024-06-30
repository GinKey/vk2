import React from 'react';
import {Link} from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('favorites')) || []);

    const removeFromFavorites = (id) => {
        const newFavorites = favorites.filter(movie => movie.id !== id);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };


    return (
        <div>
            <h1>Список избранных</h1>
            <div className="movie-list">
                {favorites.length > 0 ? (
                    favorites.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <Link to={`/movies/${movie.id}`} className="movie-link">
                                <img src={movie.poster?.previewUrl} alt={movie.title} className="movie-poster" />
                                <h2>{movie.title}</h2>
                            <p>{movie.year}</p>
                            <p>{movie.rating?.kp}</p>
                            <button className="favorite-button" onClick={() => removeFromFavorites(movie.id)}>Удалить из избранных</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Нет избранных фильмов.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
