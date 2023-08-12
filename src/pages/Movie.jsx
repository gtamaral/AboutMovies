import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//icons
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from 'react-icons/bs';

//css
//import MovieCard from "../components/MovieCard";
import './Movie.css';
import MovieCard from "../components/MovieCard";

// api keys
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {

    const {id} = useParams();   //obtendo id atraves do hook
    const [movie, setMovie] = useState(null);   //carregando o movie pelo api
    const history = useNavigate();   
    // console.log(history);

    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data)
        setMovie(data);     // como eh so um, nao tem necessidade do ".results"
    };
    
    //formatando a receia e o orçamento para usd
    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`;
        getMovie(movieUrl);
    }, [id]);

    const handleGoBack = () => {
        history(-1);
        
    };

    return (
        <div className="movie-page">
            {movie && <>
            <MovieCard movie={movie} showLink={false} infoMovie={false} />
            <div className="details">

                <div className="info">
                    <h2>
                        {movie.title}
                    </h2>
                </div>
                <p className="tagline">{movie.tagline}</p>
                <div className="info">
                    <h3>
                        <BsWallet2 /> Orçamento
                    </h3>
                    <p>{formatCurrency(movie.budget)}</p>
                </div>
                <div className="info">
                    <h3>
                        <BsGraphUp /> Receita
                    </h3>
                    <p>{formatCurrency(movie.revenue)}</p>
                </div>
                <div className="info">
                    <h3>
                        <BsHourglassSplit /> Duração
                    </h3>
                    <p>{movie.runtime} minutos</p>
                </div>
                <div className="info">
                    <h3>
                        <BsFillFileEarmarkTextFill /> Descrição 
                    </h3>
                    <p>{movie.overview}</p>
                </div>
                <button className="btn" onClick={handleGoBack}>Voltar</button>
            </div>
            </> }
        </div>
    )
};



export default Movie;
