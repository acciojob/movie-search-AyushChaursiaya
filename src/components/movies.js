import axios from 'axios';
import React, { useState } from 'react';

function Movies() {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://www.omdbapi.com/?apikey=99eb9fd1&s=${input}`)
            .then((res) => {
                setMovies(res.data.Search);
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={handleSubmit}>Search</button>
            </div>
            <ul>
                {movies && movies.length > 0 ? (movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <h1>{movie.Title}</h1>
                        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                    </li>
                )
            )) : (<p>Invalid movie name. Please try again.</p>)}
            </ul>
        </>
    )
}

export default Movies;