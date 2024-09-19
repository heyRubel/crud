import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [x, setX] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    const { email, password } = inputValue;
    e.preventDefault();
    let response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();

    if (!email || !password) {
      toast.error("Please fill full form");
      return;
    }

    try {
      if (response.status === 401) {
        toast.error(response.message);
      } else if (response.status === 404) {
        toast.error(response.message);
      } else if (response.status === 500) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        localStorage.setItem("user", response.token);
        setX("JJ");
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login_container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={inputValue.email}
            onChange={handleChange}
          />
        </div>
        <div style={{ position: "relative" }} className="form_group">
          <label htmlFor="password">Password</label>
          <input
            value={inputValue.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="show_hide_btn"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <Link to={'/forget-password'} className="forget_password_btn">Forget Password?</Link>
        <button  type="submit">Login</button>
        <p className="signup_prompt">
          Don't have an account? <Link to="/signup">SignUp</Link> here.
        </p>
      </form>
    </div>
  );
};

export default Login;
