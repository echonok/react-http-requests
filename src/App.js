import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])

  const fetchMoviesHandler = async () => {
    const res = await fetch('https://swapi.dev/api/films');
    const data = await res.json();
    const transMovies = data.results.map((movie) => ({
      id: movie.episode_id,
      title: movie.title,
      releaseDate: movie.opening_crawl,
      openingText: movie.releas_date,
    }));
    setMovies(transMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies}/>
      </section>
    </React.Fragment>
  );
}

export default App;
