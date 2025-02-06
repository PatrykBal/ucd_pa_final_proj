import React, { useEffect } from "react";
import ProfileCategories from "../components/ProfileCategories";

function ProfileCategoriesAll() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProfileCategories />
    </div>
  );
}

export default ProfileCategoriesAll;
