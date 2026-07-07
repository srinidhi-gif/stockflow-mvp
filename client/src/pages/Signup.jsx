import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.organizationName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/signup", {
        organizationName: formData.organizationName,
        email: formData.email,
        password: formData.password,
      });

      login(response.data.token, response.data.user);

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors?.length) {
        toast.error(data.errors[0].msg);
      } else {
        toast.error(data?.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="login-container">
        <div className="login-card">

          <div className="login-header">
            <h1>StockFlow</h1>
            <p>Create your account</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Organization Name</label>
              <input
                type="text"
                name="organizationName"
                placeholder="e.g. My Store"
                value={formData.organizationName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Creating Account…" : "Create Account"}
            </button>

          </form>

          <div className="login-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;