import { useState, useEffect } from "react";
import { api } from "../services/api";
import "../components/ProfileEdit.css";

function ProfileEdit({ profile, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    phone_number: "",
    location: "",
    instagram: "",
    facebook: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile?.user && profile?.profile) {
      setFormData({
        first_name: profile.user.first_name || "",
        last_name: profile.user.last_name || "",
        bio: profile.profile.bio || "",
        phone_number: profile.profile.phone_number || "",
        location: profile.profile.location || "",
        instagram: profile.profile.instagram || "",
        facebook: profile.profile.facebook || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.put(`/profile/me/`, {
        user: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
        profile: {
          bio: formData.bio,
          phone_number: formData.phone_number,
          location: formData.location,
          instagram: formData.instagram,
          facebook: formData.facebook,
        },
      });

      console.log("Update response:", response.data);
      setSuccess(true);
      if (onProfileUpdate) {
        onProfileUpdate(response.data);
      }
    } catch (err) {
      console.error("Update error:", err.response || err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!profile) {
    return (
      <div className="profile-edit-container">
        <div className="loading-message">Loading profile data...</div>
      </div>
    );
  }

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Profile updated successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Your Location"
          />
        </div>

        <div className="form-group">
          <label>Instagram</label>
          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram Profile URL"
          />
        </div>

        <div className="form-group">
          <label>Facebook</label>
          <input
            type="url"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="Facebook Profile URL"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
