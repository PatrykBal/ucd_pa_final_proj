import React from "react";
import {
  FaAppleAlt,
  FaDumbbell,
  FaBrain,
  FaHandsHelping,
} from "react-icons/fa";
import "./CardSection.css";

const CardSection = () => {
  const cards = [
    {
      id: 1,
      title: "Dieticians",
      description: "",
      icon: <FaAppleAlt />,
    },
    {
      id: 2,
      title: "Personal Trainers",
      description: "",
      icon: <FaDumbbell />,
    },
    {
      id: 3,
      title: "Nutritionists",
      description: "",
      icon: <FaAppleAlt />,
    },
    {
      id: 4,
      title: "Physical Therapists",
      description: "",
      icon: <FaHandsHelping />,
    },
    {
      id: 5,
      title: "Psychologists",
      description: "",
      icon: <FaBrain />,
    },
    {
      id: 6,
      title: "Nutritional Therapists",
      description: "",
      icon: <FaAppleAlt />,
    },
  ];

  return (
    <section className="card-section">
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <div className="icon-wrapper">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardSection;
