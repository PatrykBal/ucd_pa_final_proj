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
        const response = await api.get(PACKAGE_ENDPOINTS.PROVIDERS);
        setProfiles(response.data);
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

  return (
    <section className="profile-cards-section">
      <h2 className="profile-section-title">Popular Health Providers</h2>
      <div className="profile-cards-container">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <h3 className="profile-card-name">{profile.name}</h3>
            <p className="profile-card-description">{profile.description}</p>
            <Link to={`/profile/${profile.id}`}>
              <img
                src={profile.image}
                alt={profile.name}
                className="profile-card-image"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfileCards;
