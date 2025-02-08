import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method, isProvider, testData }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    specialization: "",
    experience_years: "",
    qualifications: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (method === "login") {
        const res = await api.post("/token/", {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        await api.post(route, formData);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert(error.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fillTestData = () => {
    if (testData) {
      setFormData(testData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{method === "login" ? "Login" : "Register"}</h1>

      <input
        className="form-input"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />

      {method === "register" && (
        <>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="form-input"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            className="form-input"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </>
      )}

      <input
        className="form-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      {method === "register" && (
        <input
          className="form-input"
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
      )}

      {isProvider && (
        <>
          <input
            className="form-input"
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            required
          />

          <input
            className="form-input"
            type="number"
            name="experience_years"
            value={formData.experience_years}
            onChange={handleChange}
            placeholder="Years of Experience"
            required
          />

          <textarea
            className="form-input"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Qualifications"
            required
          />
        </>
      )}

      {testData && (
        <button
          type="button"
          onClick={fillTestData}
          className="form-button secondary"
        >
          Fill Test Data
        </button>
      )}

      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Loading..." : method === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default Form;
