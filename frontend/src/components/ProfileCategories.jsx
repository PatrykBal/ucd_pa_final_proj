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
        const response = await api.get(PACKAGE_ENDPOINTS.PROVIDERS);
        setProfiles(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <img
              src={profile.avatar || ""}
              alt={`${profile.user.first_name} ${profile.user.last_name}`}
              className="profile-image"
            />
            <div className="profile-info">
              <h3>
                {profile.user.first_name} {profile.user.last_name}
              </h3>
              <p className="category">{profile.specialization}</p>
              <p className="experience">
                {profile.experience_years} years experience
              </p>
              <p className="description">{profile.qualifications}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCategories;
