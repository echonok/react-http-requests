import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('https://react-http-819ae-default-rtdb.firebaseio.com/movies.json');

      if (res.status !== 200) {
        throw new Error('error is here');
      }
      const data = await res.json();
      console.log({ data })
      const transMovies = Object.entries(data).map(([movieId, movie]) => ({
        id: movieId,
        title: movie.title,
        releaseDate: movie.openingText,
        openingText: movie.releaseDate,
      }));
      setMovies(transMovies);
    } catch (e) {
      setError(e.message)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler().then();
  }, [])

  let content = <p>No movies</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies}/>
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>loading...</p>
  }

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-http-819ae-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      },
    ).then();
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
