import "./HeroSection.css";

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Connecting Health Providers & Clients</h1>
        <p className="hero-subtitle">
          Discover and offer premium healthcare services with ease. Join our
          platform to connect with clients and grow your business.
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search here..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
}
