import { useState, useEffect } from "react";
import { api } from "../services/api";
import { PACKAGE_ENDPOINTS } from "../constants";
import "./ProfileCategories.css";

function ProfileCategories() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get(
          `${PACKAGE_ENDPOINTS.PROVIDERS}?include_user=true`
        );
        setProfiles(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const categories = [
    "all",
    ...new Set(
      profiles.map((profile) => profile.specialization).filter(Boolean)
    ),
  ];

  const filteredProfiles =
    selectedCategory === "all"
      ? profiles
      : profiles.filter(
          (profile) => profile.specialization === selectedCategory
        );

  return (
    <div className="profile-categories">
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "all" ? "All Categories" : category}
          </button>
        ))}
      </div>

      <div className="profiles-grid">
        {filteredProfiles.map((profile, index) => (
          <div key={`profile-${profile.id || index}`} className="profile-card">
            <div className="profile-image-wrapper">
              <img
                src={profile.profile_image || "/default-avatar.png"}
                alt={`${profile.user?.first_name || "Provider"}`}
                className="profile-image"
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="profile-info">
              <h3>
                {profile.user?.first_name} {profile.user?.last_name}
              </h3>
              <p className="specialization">
                {profile.specialization || "No specialization"}
              </p>
              <p className="experience">
                {profile.experience_years
                  ? `${profile.experience_years} years experience`
                  : "Experience not specified"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCategories;
