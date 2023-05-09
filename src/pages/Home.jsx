/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';  
import MovieCard from '../components/MovieCard';

import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topMovies, SetTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        //console.log(data);

        SetTopMovies(data.results);
        console.log(data);

    };

    //consumir a api...
    useEffect(()=> {
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

        //console.log(topRatedUrl)
        getTopRatedMovies(topRatedUrl);
    }, []); //array vazio pra toda vez q a pagina for recarregada ele vai carregar o componente e realizar o user effect again

    return ( 
        <div className='container'>
            <h2 className='title'>Melhores filmes:</h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 &&
                 topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Home;

