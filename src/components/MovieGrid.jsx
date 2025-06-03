import React from "react";
import MovieCard from "./MovieCard";

const movies = [
  { title: "Holiday Breakup", time: "38m left", img: "https://via.placeholder.com/150x85" },
  { title: "News", time: "13m left", img: "https://via.placeholder.com/150x85" },
  { title: "Jerry Springer", time: "47m left", img: "https://via.placeholder.com/150x85" },
  { title: "Epic Funny Video", time: "24m left", img: "https://via.placeholder.com/150x85" },
  { title: "FailArmy", time: "54m left", img: "https://via.placeholder.com/150x85" },
  { title: "Magic Lantern", time: "24m left", img: "https://via.placeholder.com/150x85" },
];

export default function MovieGrid({ favorites, toggleFavorite }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          isFavorite={favorites.includes(movie.title)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
