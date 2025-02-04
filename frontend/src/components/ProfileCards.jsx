import React from "react";
import "./ProfileCards.css";

import Profile1 from "../images/Profile1.jpg";
import Profile2 from "../images/Profile2.jpg";
import Profile3 from "../images/Profile3.jpg";
import Profile4 from "../images/Profile4.jpg";
import Profile5 from "../images/Profile5.jpg";
import Profile6 from "../images/Profile6.jpg";

const ProfileCards = () => {
  const cards = [
    {
      id: 1,
      name: "John Doe",
      description: "Personal Trainer",
      image: Profile1,
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Psychologist",
      image: Profile2,
    },
    {
      id: 3,
      name: "Alan Johnson",
      description: "Physical Therapist",
      image: Profile3,
    },
    {
      id: 4,
      name: "Bob Brown",
      description: "Dietician",
      image: Profile4,
    },
    {
      id: 5,
      name: "Charlie Davis",
      description: "Nutritional Therapist",
      image: Profile6,
    },
    {
      id: 6,
      name: "Dana Lee",
      description: "Nutritionist",
      image: Profile5,
    },
  ];

  return (
    <section className="profile-cards-section">
      <h2 className="profile-section-title">Popular Health Providers</h2>
      <div className="profile-cards-container">
        {cards.map((card) => (
          <div key={card.id} className="profile-card">
            <h3 className="profile-card-name">{card.name}</h3>
            <p className="profile-card-description">{card.description}</p>
            <img
              src={card.image}
              alt={card.name}
              className="profile-card-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileCards;
