// src/App.jsx
import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const searchMovies = async () => {
    const res = await axios.get(`${API_BASE}/movies/search`, {
      params: { query },
    });
    setResults(res.data);
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const saveFavorite = async (movie) => {
    await axios.post(
      `${API_BASE}/movies/favorite`,
      {
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Immortal Moviez</h1>

      <input
        type="text"
        className="border p-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 ml-2" onClick={searchMovies}>
        Search
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {results.map((movie) => (
          <div key={movie.id} className="border rounded p-2 shadow">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
            <button
              className="mt-2 bg-green-500 text-white px-2 py-1"
              onClick={() => saveFavorite(movie)}
            >
              Save Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
