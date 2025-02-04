import React from "react";
import {
  FaBuromobelexperte,
  FaCheckDouble,
  FaBolt,
  FaCreditCard,
} from "react-icons/fa";
import "./JoinCards.css";

const JoinCards = () => {
  // Define data for 4 cards
  const cards = [
    {
      id: 1,
      icon: <FaBuromobelexperte />,
      description: "Acces a pool of top talent",
    },
    {
      id: 2,
      icon: <FaCheckDouble />,
      description: "Enjoy a simple, easy-to-use matching experience",
    },
    {
      id: 3,
      icon: <FaBolt />,
      description: "Get quality work done quickly and within budget",
    },
    {
      id: 4,
      icon: <FaCreditCard />,
      description: "Only pay when you’re happy",
    },
  ];

  return (
    <section className="join-cards-section">
      <h2 className="join-section-title">Take care of your Health today</h2>
      <div className="join-cards-container">
        {cards.map((card) => (
          <div key={card.id} className="join-card">
            <div className="join-icon">{card.icon}</div>
            <p className="join-card-description">{card.description}</p>
          </div>
        ))}
      </div>
      <button className="join-now-btn">Join Now</button>
    </section>
  );
};

export default JoinCards;
