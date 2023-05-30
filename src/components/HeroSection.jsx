// import PropTypes from "prop-types";

import { useState } from "react";
import "./HeroSection.css";

export default function HeroSection({
  handleSubmit,
  handleChange,
  searchInput,
}) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to moviewood</h1>
        <p className="hero-description">
          Find information about movies, TV shows, and people
        </p>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies, TV shows, people..."
            value={searchInput}
            onChange={handleChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

// HeroSection.propTypes = {
//   handleChange: PropTypes.func,
//   handleSubmit: PropTypes.func,
//   searchInput: PropTypes.string,
// };
