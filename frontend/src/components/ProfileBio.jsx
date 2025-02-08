import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfileBio.css";
import { api } from "../services/api";

function ProfileBio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePackage, setActivePackage] = useState(null);

  useEffect(() => {
    const fetchProviderData = async () => {
      if (!id) {
        navigate("/providers");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const providerRes = await api.get(`/providers/${id}/`);
        setProvider(providerRes.data);

        // Only fetch packages and reviews if provider exists
        if (providerRes.data) {
          const [packagesRes, reviewsRes] = await Promise.all([
            api.get(`/packages/`, {
              params: { service_provider: id },
            }),
            api.get(`/reviews/`, {
              params: { service_provider: id },
            }),
          ]);

          setPackages(packagesRes.data);
          setReviews(reviewsRes.data);
          if (packagesRes.data.length > 0) {
            setActivePackage(packagesRes.data[0].id);
          }
        }
      } catch (error) {
        setError(
          error.response?.status === 404
            ? "Provider not found"
            : error.code === "ERR_NETWORK"
            ? "Unable to connect to server. Please check if the server is running."
            : "An error occurred while fetching the data"
        );
        if (error.response?.status === 404) {
          navigate("/providers");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [id, navigate]);

  const formatRating = (rating) => {
    const numRating = Number(rating);
    return !isNaN(numRating) ? numRating.toFixed(1) : "0.0";
  };

  const renderStars = (rating) => {
    const numRating = Number(rating);
    return "⭐".repeat(!isNaN(numRating) ? Math.round(numRating) : 0);
  };

  if (loading)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate("/providers")} className="back-button">
          Back to Providers
        </button>
      </div>
    );

  if (!provider)
    return (
      <div className="error">
        <p>Provider not found</p>
        <button onClick={() => navigate("/providers")} className="back-button">
          Back to Providers
        </button>
      </div>
    );

  const getSpecializationLabel = (code) => {
    const specializations = {
      PT: "Personal Trainer",
      NT: "Nutritionist",
      PS: "Psychologist",
      PH: "Physical Therapist",
      NU: "Nutritional Therapist",
      DI: "Dietician",
    };
    return specializations[code] || code;
  };

  return (
    <div className="profile-bio-page">
      <div className="profile-bio-card">
        <img
          src={provider.profile_image || "/default-avatar.png"}
          alt={`${provider.user?.first_name || "Provider"}`}
          className="profile-bio-image"
        />
        <h2 className="profile-bio-name">
          {provider.user?.first_name} {provider.user?.last_name}
          {provider.is_verified && <span className="verified-badge">✓</span>}
        </h2>
        <p className="profile-bio-description">{provider.specialization}</p>

        <div className="profile-bio">
          <h3>About Me</h3>
          <p className="bio-description">
            {provider.bio_description ||
              provider.qualifications ||
              "No bio available"}
          </p>
          <h3>Qualifications</h3>
          <p>{provider.qualifications}</p>
          <p className="experience">
            {provider.experience_years} years experience
          </p>
          <div className="rating-summary">
            <span className="stars">{renderStars(provider.rating)}</span>
            <span className="rating-text">
              {formatRating(provider.rating)} ({provider.total_reviews || 0}{" "}
              reviews)
            </span>
          </div>
          <button className="contact-btn">Contact Me</button>
        </div>

        {packages.length > 0 && (
          <div className="pricing-card">
            <div className="pricing-tabs">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`tab-btn ${
                    activePackage === pkg.id ? "active" : ""
                  }`}
                  onClick={() => setActivePackage(pkg.id)}
                >
                  {pkg.name}
                </button>
              ))}
            </div>

            <div className="pricing-content">
              {packages
                .filter((pkg) => pkg.id === activePackage)
                .map((pkg) => (
                  <div key={pkg.id} className="package-details">
                    <h3>{pkg.name}</h3>
                    <p>{pkg.description}</p>
                    <ul>
                      {Array.isArray(pkg.features)
                        ? pkg.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))
                        : Object.entries(pkg.features).map(([key, value]) => (
                            <li key={key}>{value}</li>
                          ))}
                    </ul>
                    <p className="duration">
                      Duration {pkg.duration_months} months
                    </p>
                    <p className="price">€{pkg.price}</p>
                    {pkg.is_active ? (
                      <button className="purchase-btn">Purchase</button>
                    ) : (
                      <p className="package-inactive">Currently Unavailable</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Only show reviews section if there are reviews */}
        {reviews.length > 0 && (
          <div className="reviews-section">
            <h3 className="text-light">Reviews</h3>
            <div className="reviews-summary">
              <div className="average-rating">
                <span className="rating-number">
                  {formatRating(provider.rating)}
                </span>
                <span className="total-reviews">
                  ({provider.total_reviews || 0} reviews)
                </span>
              </div>
            </div>
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <h4>{review.client_name || "Anonymous"}</h4>
                    <div className="stars">{renderStars(review.rating)}</div>
                  </div>
                  {review.package_details && (
                    <p className="package-name">
                      Package: {review.package_details.name} (
                      {review.package_details.package_type})
                    </p>
                  )}
                  <p className="review-comment">{review.comment}</p>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileBio;
