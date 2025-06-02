import React from "react";

export default function MovieCard({ movie, isFavorite, toggleFavorite }) {
  return (
    <div className="movie-card" title={movie.title}>
      <img src={movie.img} alt={movie.title} />
      <span className="live-tag">LIVE</span>
      <div className="movie-title">{movie.title}</div>
      <div className="movie-time">{movie.time}</div>
      <button
        className="favorite-btn"
        onClick={() => toggleFavorite(movie.title)}
      >
        {isFavorite ? "💛 Remove Favorite" : "❤️ Favorite"}
      </button>
    </div>
  );
}
