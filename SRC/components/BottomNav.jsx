import React from "react";

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <button>
        <span>🏠</span>
        <span>Home</span>
      </button>
      <button>
        <span>📺</span>
        <span>Live TV</span>
      </button>
      <button>
        <span>▶️</span>
        <span>On Demand</span>
      </button>
      <button>
        <span>🔍</span>
        <span>Discover</span>
      </button>
    </div>
  );
}
