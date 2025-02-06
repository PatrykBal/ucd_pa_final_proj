import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import profiles from "../profiles";
import "./ProfileCategories.css";

function ProfileCategories() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Helper function to format category ID
  const formatCategoryId = (category) =>
    category.toLowerCase().replace(/ /g, "-");

  // Groups profiles by their description/category
  const categories = {
    Dietician: profiles.filter((p) => p.description === "Dietician"),
    "Personal Trainer": profiles.filter(
      (p) => p.description === "Personal Trainer"
    ),
    Nutritionist: profiles.filter((p) => p.description === "Nutritionist"),
    "Physical Therapist": profiles.filter(
      (p) => p.description === "Physical Therapist"
    ),
    Psychologist: profiles.filter((p) => p.description === "Psychologist"),
    "Nutritional Therapist": profiles.filter(
      (p) => p.description === "Nutritional Therapist"
    ),
  };

  return (
    <div className="categories-container">
      {Object.entries(categories).map(([category, categoryProfiles]) => (
        <div
          key={category}
          className="category-section"
          id={formatCategoryId(category + "s")}
        >
          <h2 className="category-title">{category}s</h2>
          <div className="category-cards">
            {categoryProfiles.map((profile) => (
              <Link
                to={`/profile/${profile.id}`}
                key={profile.id}
                className="profile-card-link"
              >
                <div className="category-profile-card">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="category-profile-image"
                  />
                  <div className="category-profile-info">
                    <h3>{profile.name}</h3>
                    <p>{profile.description}</p>
                    <p className="profile-specialty">{profile.specialty}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileCategories;
