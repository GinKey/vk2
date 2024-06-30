import React from 'react';
import { Link } from 'react-router-dom';
import '../navigate_button.css';

const FavouriteButton = () => {
    return (
        <nav>
            <Link to="/favorites" className="button">
                Перейти в избранное
            </Link>
        </nav>
    );
};

export default FavouriteButton;
