import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to moviewood</h1>
        <p class="hero-description">
          Find information about movies, TV shows, and people
        </p>
        <form class="search-form">
          <input
            type="text"
            class="search-input"
            placeholder="Search movies, TV shows, people..."
          />
          <button type="submit" class="search-button">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
