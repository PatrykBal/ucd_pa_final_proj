import React, { useState, useEffect } from "react";
import "./ProfileCards.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ProfileCards() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {

    async function fetchProfiles ()   {
       const { data } = await axios.get("/api/profiles/");
       
       setProfiles(data);
    }

    fetchProfiles()

  }, [])

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
