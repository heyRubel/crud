import { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [inputValue, setInputValue] = useState({ password: "", cpassword: "" });
  const { token } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    if (!token) {
      toast.error("Token missing! Access denied.");
      navigate("/login");  // Redirect to login if token is missing
      return;
    }
    const verifyToken = async () => {
      let response = await fetch(
        "http://localhost:8000/verify-token",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      response = await response.json();
      console.log(response);

      if (response.status === 401 || response.status === 500) {
        toast.error(response.message);
        navigate("/login")
      } else if (response.status === 200) {
      
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, cpassword } = inputValue;
    let response = await fetch(`http://localhost:8000/reset-password/`, {
      method: "POST",
      body: JSON.stringify({ password, cpassword }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    response = await response.json();
    if (response.status === 400) {
      toast.error(response.message);
    } else if (response.status === 200) {
      toast.success(response.message);

      navigate("/login");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="new-password">New Password:</label>
          <input
            onChange={handleChange}
            value={inputValue.password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            onChange={handleChange}
            value={inputValue.cpassword}
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm new password"
            required
          />
        </div>
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
