import React from "react";

export default function Navbar({ loggedIn, onUserIconClick }) {
  return (
    <nav className="navbar">
      <div className="logo">Immortal Movies</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#live-tv">Live TV</a></li>
        <li><a href="#on-demand">On Demand</a></li>
        <li><a href="#discover">Discover</a></li>
      </ul>
      <div className="user-icon" onClick={onUserIconClick} title={loggedIn ? "Logout" : "Login"}>
        {loggedIn ? "👤" : "G"}
      </div>
    </nav>
  );
}
