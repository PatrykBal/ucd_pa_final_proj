import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  
  const validCategories = [
    "dietician",
    "dieticians",
    "personal trainer",
    "personal trainers",
    "nutritionist",
    "nutritionists",
    "physical therapist",
    "physical therapists",
    "psychologist",
    "psychologists",
    "nutritional therapist",
    "nutritional therapists"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Converts search term to lowercase for comparison
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Finds matching category
    const matchedCategory = validCategories.find(category => 
      searchLower === category || searchLower === category.slice(0, -1)
    );

    if (matchedCategory) {
      // Formats the category for the URL (handle both singular and plural forms)
      let formattedCategory = matchedCategory;
      if (!matchedCategory.endsWith('s')) {
        formattedCategory += 's';
      }
      
      // Navigates to the categories page with the hash
      navigate(`/categories#${formattedCategory.replace(/ /g, "-")}`);
      setSearchTerm(""); 
    } else {
    
      alert("Please enter a valid category (e.g., Dietician, Personal Trainer, etc.)");
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Connecting Health Providers & Clients</h1>
        <p className="hero-subtitle">
          Discover and offer premium healthcare services with ease. Join our
          platform to connect with clients and grow your business.
        </p>
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search for health professionals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
