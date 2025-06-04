import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function LoginForm({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}

function SignupForm({ signup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signup(email, password);
      alert("Signup successful. You can now log in.");
    } catch {
      alert("Signup failed. Try a different email.");
    }
  };

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-xl font-semibold">Signup</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 w-full" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) fetchFavorites();
  }, [token]);

  const searchMovies = async () => {
    const res = await axios.get(`${API_BASE}/movies/search`, { params: { query } });
    setResults(res.data);
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const signup = async (email, password) => {
    await axios.post(`${API_BASE}/auth/signup`, { email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setFavorites([]);
  };

  const saveFavorite = async (movie) => {
    try {
      await axios.post(
        `${API_BASE}/movies/favorite`,
        {
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
        },
        { headers: { Authorization: token } }
      );
      alert("Added to favorites!");
      fetchFavorites();
    } catch {
      alert("You must be logged in to save favorites.");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${API_BASE}/movies/favorites`, {
        headers: { Authorization: token },
      });
      setFavorites(res.data);
    } catch {
      console.warn("Failed to fetch favorites.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Immortal Moviez</h1>

      {!token ? (
        <>
          <SignupForm signup={signup} />
          <LoginForm login={login} />
        </>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="border p-2 flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2" onClick={searchMovies}>
              Search
            </button>
            <button className="bg-red-500 text-white px-4 py-2" onClick={logout}>
              Logout
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((movie) => (
                <div key={movie.id} className="border rounded p-2 shadow">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto"
                  />
                  <h3 className="mt-2 text-lg">{movie.title}</h3>
                  <button
                    className="mt-2 bg-green-500 text-white px-2 py-1 w-full"
                    onClick={() => saveFavorite(movie)}
                  >
                    Save Favorite
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Your Favorites</h2>
            {favorites.length === 0 ? (
              <p className="text-gray-500">No favorites yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favorites.map((movie) => (
                  <div key={movie._id || movie.movieId} className="border rounded p-2 shadow">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                    <h3 className="mt-2 text-lg">{movie.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
