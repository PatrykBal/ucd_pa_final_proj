import React, { useEffect } from "react";
import ProfileBio from "../components/ProfileBio";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

function Profile() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProfileBio />
    </div>
  );
}

export default Profile;
