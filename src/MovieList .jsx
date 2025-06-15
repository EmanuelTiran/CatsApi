import React, { useState, useEffect } from 'react';

const TMDB_TOKEN = 'eyjhbgciojijiuzi1nij9.eyjhdwqioiiiwtfim2m3m2m2m2m3y2izndrimwy1ymy5mgiynwndbkmiisi...'; // Truncated for privacy

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + TMDB_TOKEN);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading movies...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Popular Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
