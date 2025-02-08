import { useState, useEffect } from "react";
import { api } from "../services/api";
import "../components/PackageManager.css";

function PackageManager({ profile }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    duration_months: "",
    package_type: "BASIC",
    features: [""],
    is_active: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get("/packages/");
      setPackages(response.data);
    } catch (err) {
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: newPackage.name,
        price: parseFloat(newPackage.price),
        duration_months: parseInt(newPackage.duration_months),
        package_type: newPackage.package_type,
        features: newPackage.features.filter((f) => f.trim() !== ""),
        is_active: true,
      };

      const response = await api.post("/packages/", payload);
      setPackages([...packages, response.data]);
      setShowForm(false);
      setNewPackage({
        name: "",
        price: "",
        duration_months: "",
        package_type: "BASIC",
        features: [""],
        is_active: true,
      });
    } catch (err) {
      setError("Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (!window.confirm("Are you sure you want to delete this package?")) {
      return;
    }

    try {
      await api.delete(`/packages/${packageId}/`);
      setPackages(packages.filter((pkg) => pkg.id !== packageId));
    } catch (err) {
      setError("Failed to delete package");
      console.error("Error deleting package:", err);
    }
  };

  const handleAddFeature = () => {
    setNewPackage((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleFeatureChange = (index, value) => {
    setNewPackage((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const handleRemoveFeature = (index) => {
    setNewPackage((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  if (loading && packages.length === 0) {
    return <div className="loading">Loading packages...</div>;
  }

  return (
    <div className="package-manager">
      <div className="package-header">
        <h2>Manage Packages</h2>
        <button
          className="create-package-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create New Package"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreatePackage} className="package-form">
          <div className="form-group">
            <label>Package Name</label>
            <input
              type="text"
              value={newPackage.name}
              onChange={(e) =>
                setNewPackage((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (€)</label>
              <input
                type="number"
                value={newPackage.price}
                onChange={(e) =>
                  setNewPackage((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (months)</label>
              <input
                type="number"
                value={newPackage.duration_months}
                onChange={(e) =>
                  setNewPackage((prev) => ({
                    ...prev,
                    duration_months: e.target.value,
                  }))
                }
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Package Type</label>
              <select
                value={newPackage.package_type}
                onChange={(e) =>
                  setNewPackage((prev) => ({
                    ...prev,
                    package_type: e.target.value,
                  }))
                }
              >
                <option value="BASIC">Basic</option>
                <option value="STANDARD">Standard</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Features</label>
            {newPackage.features.map((feature, index) => (
              <div key={index} className="feature-input">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter a feature"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="remove-feature-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="add-feature-btn"
            >
              Add Feature
            </button>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Package"}
          </button>
        </form>
      )}

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <div className="package-header">
              <h3>{pkg.name}</h3>
              <span
                className={`package-type ${pkg.package_type.toLowerCase()}`}
              >
                {pkg.package_type}
              </span>
            </div>
            <div className="package-price">€{pkg.price}</div>
            <div className="package-duration">{pkg.duration_months} months</div>
            <ul className="package-features">
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleDeletePackage(pkg.id)}
              className="delete-btn"
            >
              Delete Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageManager;
