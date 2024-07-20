import axios from 'axios';
import React, { useState } from 'react';

function Movies() {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        axios.get(`http://www.omdbapi.com/?apikey=99eb9fd1&s=${input}`)
            .then((res) => {
                if (res.data.Response === "True") {
                    setMovies(res.data.Search);
                } else {
                    setMovies([]);
                    setError('Invalid movie name. Please try again.');
                }
            }).catch((error) => {
                console.log(error);
                setError('An error occurred. Please try again later.');
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit'>Search</button>
            </form>
            <ul>
                {movies.length > 0 ? 
                (movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <h1>{movie.Title}</h1>
                        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                    </li>
                ))) : (
                    <p>{error}</p>
                )}
            </ul>
        </>
    );
}

export default Movies;
