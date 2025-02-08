import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import "../styles/Dashboard.css";
import ProfileEdit from "../components/ProfileEdit";
import PackageManager from "../components/PackageManager";

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    package_type: "BASIC",
    price: "",
    duration_months: "",
    features: [],
    is_active: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        console.log("Current user:", user);

        const [profileRes, packagesRes] = await Promise.all([
          api.get("/profile/me/"),
          api.get("/packages/", {
            params: { service_provider: user.id },
          }),
        ]);

        console.log("Profile response:", profileRes.data);
        setProfile(profileRes.data);
        setPackages(packagesRes.data);
      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  // Debug log to see the structure
  useEffect(() => {
    if (profile) {
      console.log("Complete profile data:", JSON.stringify(profile, null, 2));
      console.log("User data:", profile.user);
      console.log("Profile data:", profile.profile);
      console.log("Is service provider:", profile.profile?.is_service_provider);
    }
  }, [profile]);

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/packages/", {
        ...newPackage,
        features: newPackage.features.filter((f) => f.trim() !== ""),
        service_provider: user.id,
      });

      console.log("Package created:", response.data);
      setPackages([...packages, response.data]);
      setShowPackageForm(false);
      setNewPackage({
        name: "",
        package_type: "BASIC",
        price: "",
        duration_months: "",
        features: [],
        is_active: true,
      });
    } catch (error) {
      console.error("Error creating package:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  };

  if (loading || authLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="error">Failed to load profile data</div>
      </div>
    );
  }

  const renderProviderContent = () => (
    <>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Packages</h3>
          <p>{packages.length}</p>
          <span className="stat-label">Active Packages</span>
        </div>
        <div className="stat-card">
          <h3>Profile</h3>
          <p>
            {profile?.user?.first_name} {profile?.user?.last_name}
          </p>
          <span className="stat-label">Name</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h3>Bio</h3>
          <p className="bio-text">
            {profile?.profile?.bio || "No bio available"}
          </p>
        </div>

        <div className="section-card">
          <h3>Social Media</h3>
          <div className="social-links">
            {profile?.profile?.instagram && (
              <a
                href={profile.profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {profile?.profile?.facebook && (
              <a
                href={profile.profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            )}
            {!profile?.profile?.instagram && !profile?.profile?.facebook && (
              <p>No social media links provided</p>
            )}
          </div>
        </div>

        <div className="section-card">
          <h3>Packages</h3>
          {packages.length > 0 ? (
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <h4>{pkg.name}</h4>
                  <p className="package-price">€{pkg.price}</p>
                  <p className="package-duration">
                    {pkg.duration_months} months
                  </p>
                  <div className="package-features">
                    {Array.isArray(pkg.features) &&
                      pkg.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No packages created yet</p>
          )}
          <button
            className="create-package-btn"
            onClick={() => setShowPackageForm(!showPackageForm)}
          >
            {showPackageForm ? "Cancel" : "Create New Package"}
          </button>
        </div>
      </div>

      {showPackageForm && (
        <form onSubmit={handleCreatePackage} className="package-form">
          <div className="form-group">
            <label>Package Name</label>
            <input
              type="text"
              value={newPackage.name}
              onChange={(e) =>
                setNewPackage({ ...newPackage, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              value={newPackage.package_type}
              onChange={(e) =>
                setNewPackage({ ...newPackage, package_type: e.target.value })
              }
            >
              <option value="BASIC">Basic</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price (€)</label>
            <input
              type="number"
              value={newPackage.price}
              onChange={(e) =>
                setNewPackage({ ...newPackage, price: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (months)</label>
            <input
              type="number"
              value={newPackage.duration_months}
              onChange={(e) =>
                setNewPackage({
                  ...newPackage,
                  duration_months: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Features (one per line)</label>
            <textarea
              value={newPackage.features.join("\n")}
              onChange={(e) =>
                setNewPackage({
                  ...newPackage,
                  features: e.target.value.split("\n"),
                })
              }
              rows="4"
            />
          </div>
          <button type="submit" className="submit-package-btn">
            Create Package
          </button>
        </form>
      )}
    </>
  );

  const renderClientContent = () => (
    <>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Profile</h3>
          <p>
            {profile?.user?.first_name} {profile?.user?.last_name}
          </p>
          <span className="stat-label">Name</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h3>Bio</h3>
          <p className="bio-text">
            {profile?.profile?.bio || "No bio available"}
          </p>
        </div>

        <div className="section-card">
          <h3>Subscriptions</h3>
          <p>No active subscriptions</p>
        </div>
      </div>
    </>
  );

  const renderProfileContent = () => (
    <div className="dashboard-sections">
      <ProfileEdit
        profile={profile}
        onProfileUpdate={(updatedProfile) => setProfile(updatedProfile)}
      />
    </div>
  );

  const renderPackagesContent = () => (
    <div className="dashboard-sections">
      <PackageManager profile={profile} />
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <nav className="dashboard-nav">
          <Link
            to="#"
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Link>
          <Link
            to="#"
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </Link>
          <Link
            to="#"
            className={activeTab === "packages" ? "active" : ""}
            onClick={() => setActiveTab("packages")}
          >
            Packages
          </Link>
          <Link
            to="#"
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </Link>
        </nav>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome, {profile?.user?.first_name || "User"}!</h1>
          <p className="last-login">
            Last login: {new Date().toLocaleDateString()}
          </p>
        </div>

        {activeTab === "profile" ? (
          renderProfileContent()
        ) : activeTab === "packages" ? (
          renderPackagesContent()
        ) : activeTab === "overview" ? (
          renderClientContent()
        ) : (
          <div>Content for {activeTab} tab</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
