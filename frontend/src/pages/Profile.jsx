import React, { useEffect } from "react";
import ProfileBio from "../components/ProfileBio";
import profiles from "../profiles";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const profile = profiles.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!profile) {
    return <div>Profile Not Found</div>;
  }

  return (
    <div>
      <ProfileBio profile={profile} />
    </div>
  );
}

export default Profile;
