import React from "react";
import HeroSection from "../components/HeroSection";
import CardSection from "../components/CardSection";
import ProfileCards from "../components/ProfileCards"
import JoinCards from "../components/JoinCards";

function Home() {
  return (
    <div>
      <HeroSection />
      <CardSection />
      <ProfileCards />
      <JoinCards />
    </div>
  );
}

export default Home;
