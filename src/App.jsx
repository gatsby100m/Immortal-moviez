import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const register = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      alert("Account created and logged in!");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.msg || err.message));
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      alert("Logged in successfully!");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.msg || err.message));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    alert("Logged out");
  };

  const searchMovies = async () => {
    try {
      const res = await axios.get(`${API_BASE}/movies/search`, {
        params: { query },
      });
      setResults(res.data);
    } catch (err) {
      alert("Movie search failed");
    }
  };

  const saveFavorite = async (movie) => {
    if (!token) {
      alert("Please log in first to save favorites.");
      return;
    }
    try {
      await axios.post(
        `${API_BASE}/movies/favorite`,
        {
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Favorite saved!");
    } catch (error) {
      alert("Failed to save favorite: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Immortal Moviez</h1>

      {!token && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {isLoginMode ? "Login" : "Sign Up"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={isLoginMode ? login : register}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>
          <p className="mt-2 text-sm text-center">
            {isLoginMode ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLoginMode(false)}
                  className="text-blue-600 underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLoginMode(true)}
                  className="text-blue-600 underline"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      )}

      {token && (
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded mb-4"
        >
          Logout
        </button>
      )}

      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-grow"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          onClick={searchMovies}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="border rounded p-2 shadow flex flex-col items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2"
            />
            <h2 className="text-lg font-semibold text-center">{movie.title}</h2>
            <button
              onClick={() => saveFavorite(movie)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
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
