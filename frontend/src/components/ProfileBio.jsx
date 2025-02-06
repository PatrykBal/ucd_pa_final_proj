import "./ProfileBio.css";
import profiles from "../profiles";

function ProfileBio() {
  const profile = profiles[0];

  return (
    <div className="profile-bio-page">
      <div className="profile-bio-card">
        <img
          src={profile.image}
          alt={profile.name}
          className="profile-bio-image"
        />
        <h2 className="profile-bio-name">{profile.name}</h2>
        <p className="profile-bio-description">{profile.description}</p>
        <div className="profile-bio">
          <h3>Bio</h3>
          <p>{profile.bio}</p>
          <button className="contact-btn">Contact Me</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBio;
