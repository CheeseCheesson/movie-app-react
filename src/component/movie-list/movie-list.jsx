import React from 'react'

import MovieCard from '../movie-card/movie-card'

import './movie-list.css'

const MovieList = ({movies, genres, onStars}) => {
    return (
        <div className="movie-list">
            {
                movies.map(movie => (
                    <MovieCard key={movie.id} {...movie} genres={genres} onStars={onStars}/>
                ))
            }

        </div>
    )
}

export default MovieList
