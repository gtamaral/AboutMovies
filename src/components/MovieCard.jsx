/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import { FaStar } from 'react-icons/fa';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true, infoMovie = true }) => {
    return (
        <div className='movie-card'>
            <img src={imageUrl + movie.poster_path} alt={movie.title} />
            {infoMovie && 
                <h2>{movie.title}</h2>}
            {infoMovie && 
            <p>
            <FaStar /> {movie.vote_average}
            </p>
            }       
            {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
    );
    
}
// teste

export default MovieCard;
