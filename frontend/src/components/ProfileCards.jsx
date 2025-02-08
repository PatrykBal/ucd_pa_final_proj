import React, { useState, useEffect } from "react";
import "./ProfileCards.css";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { PACKAGE_ENDPOINTS } from "../constants";

function ProfileCards() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  
  const displayProfiles = profiles.slice(0, 6);

  return (
    <section className="profile-cards-section">
      <h2 className="profile-section-title">Popular Health Providers</h2>
      <div className="profile-cards-container">
        <div className="profile-cards-grid">
          {displayProfiles.map((profile, index) => (
            <div
              key={`profile-${profile.id || index}`}
              className="profile-card"
            >
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
    </section>
  );
}

export default ProfileCards;
