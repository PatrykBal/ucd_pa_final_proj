import React from "react";
import HeroSection from "./HeroSection";
import CardSection from "./CardSection";
import ProfileCards from "./ProfileCards"

function Home() {
  return (
    <div>
      <HeroSection />
      <CardSection />
      <ProfileCards />
    </div>
  );
}

export default Home;
