import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import LoginModal from "./components/LoginModal";
import BottomNav from "./components/BottomNav";

const demoUser = {
  email: "user@immortalmovies.com",
  password: "password123",
  token: "immortal-demo-token",
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem("immortalToken");
    setLoggedIn(!!token);
  }, []);

  const handleLogin = (email, password) => {
    if (email === demoUser.email && password === demoUser.password) {
      localStorage.setItem("immortalToken", demoUser.token);
      setLoggedIn(true);
      setShowModal(false);
      alert("Welcome to Immortal Movies!");
    } else {
      alert("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Log out from Immortal Movies?")) {
      localStorage.removeItem("immortalToken");
      setLoggedIn(false);
      alert("Logged out");
    }
  };

  const toggleFavorite = (title) => {
    let updatedFavs;
    if (favorites.includes(title)) {
      updatedFavs = favorites.filter((f) => f !== title);
      alert(`${title} removed from favorites`);
    } else {
      updatedFavs = [...favorites, title];
      alert(`${title} added to favorites`);
    }
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        onUserIconClick={() => {
          loggedIn ? handleLogout() : setShowModal(true);
        }}
      />
      <main>
        <h2 className="section-title">What's On Now</h2>
        <MovieGrid favorites={favorites} toggleFavorite={toggleFavorite} />
      </main>
      <BottomNav />
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}
