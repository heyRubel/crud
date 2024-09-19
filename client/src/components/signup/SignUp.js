import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"; // Make sure this CSS file is in the same folder
import { useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = inputValue;

    if (password.length >= 6 && cpassword.length <= 30) {
      let result = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, cpassword }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      console.log(result);

      if (result.status === 400) {
        toast.error(result.message);
      } else if (result.status === 409) {
        toast.error(result.message);
      } else if (result.status === 500) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        navigate("/login");
      }
    } else {
      toast.error("Password atlest 6 charecters");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className="signup_container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
            value={inputValue.name}
          />
        </div>
        <div className="form_group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={inputValue.email}
          />
        </div>
        <div style={{ position: "relative" }} className="form_group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={inputValue.password}
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
        <div style={{ position: "relative" }} className="form_group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            onChange={handleChange}
            value={inputValue.cpassword}
            type={showCPassword ? "text" : "password"}
            id="cpassword"
            name="cpassword"
            required
          />
          <span
            onClick={() => setShowCPassword(!showCPassword)}
            className="show_hide_btn"
          >
            {showCPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button type="submit">Sign Up</button>
        <p className="login_prompt">
          Already have an account? <Link to="/">Login</Link> here.
        </p>
      </form>
    </div>
  );
};

export default Signup;
