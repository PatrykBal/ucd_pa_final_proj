import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProfileBio.css";
import { packageDetails, initialPackageState } from "../pricingData";
import { reviewsData } from "../reviewsData";
import axios from "axios";

function ProfileBio() {
  const { id } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await axios.get(`/api/profiles/${id}`);
        console.log("Fetched profile:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, [id]);


  const [activePackage, setActivePackage] = useState(initialPackageState);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!profile) {
    return <div>Loading...</div>;
  }

  // Pricing details for specific profile
  const profilePricing = packageDetails[profile.id] || packageDetails[1];

  const displayedReviews = showAllReviews
    ? reviewsData
    : reviewsData.slice(0, 2);

  const renderStars = (rating) => "⭐".repeat(rating);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
        {/* Pricing Card */}
        <div className="pricing-card">
          <div className="pricing-tabs">
            <button
              className={`tab-btn ${activePackage === "basic" ? "active" : ""}`}
              onClick={() => setActivePackage("basic")}
            >
              Basic
            </button>
            <button
              className={`tab-btn ${
                activePackage === "standard" ? "active" : ""
              }`}
              onClick={() => setActivePackage("standard")}
            >
              Standard
            </button>
            <button
              className={`tab-btn ${
                activePackage === "premium" ? "active" : ""
              }`}
              onClick={() => setActivePackage("premium")}
            >
              Premium
            </button>
          </div>

          <div className="pricing-content">
            <div className="package-details">
              <h3>{profilePricing[activePackage].title}</h3>
              <ul>
                {profilePricing[activePackage].features.map(
                  (feature, index) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
              <p className="price">{profilePricing[activePackage].price}</p>
              <button className="purchase-btn">Purchase</button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3 className="text-light">Reviews</h3>
          <div className="reviews-summary">
            <div className="average-rating">
              <span className="rating-number">
                {(
                  reviewsData.reduce((acc, review) => acc + review.rating, 0) /
                  reviewsData.length
                ).toFixed(1)}
              </span>
              <span className="total-reviews">
                ({reviewsData.length} reviews)
              </span>
            </div>
          </div>
          <div className="review-list">
            {displayedReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <h4>{review.name}</h4>
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">{formatDate(review.date)}</span>
              </div>
            ))}
          </div>
          {reviewsData.length > 2 && (
            <button
              className="show-more-btn"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show Less" : "Show More Reviews"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileBio;
