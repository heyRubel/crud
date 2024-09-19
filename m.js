// Is problem ko solve karne ke liye tumhe frontend routing mein validation karna hoga. Agar user token ke bina ya galat token ke saath /reset-password/token URL kholne ki koshish karega, to tumhe usse restrict karna hoga. Yeh steps follow kar sakte ho:

// Step 1: Frontend mein Token Validation
// Jab user /reset-password/:token page pe aata hai, pehle frontend se token verify karlo. Agar token valid nahi hai, to usko error page ya login page pe redirect kar do.

// Iske liye tum useEffect aur useNavigate hooks ka use kar sakte ho. Yaha ek example hai:

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();  // Token from URL
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Send request to backend to verify the token
        let response = await fetch(`http://localhost:8000/verify-token/${token}`);
        let result = await response.json();
        if (response.ok && result.valid) {
          setIsValidToken(true);  // Token is valid
        } else {
          navigate("/invalid-token");  // Redirect to error page if token is invalid
        }
      } catch (error) {
        console.error("Token validation error", error);
        navigate("/invalid-token");
      }
    };

    if (token) {
      verifyToken();  // Only verify if token exists
    } else {
      navigate("/invalid-token");  // Redirect if no token provided
    }
  }, [token, navigate]);

  if (!isValidToken) {
    return <div>Loading...</div>;  // Show loading while token is being verified
  }

  // Rest of your reset password form component
  return (
    <div>
      <h2>Reset Password</h2>
      {/* Reset password form goes here */}
    </div>
  );
};

export default ResetPassword;






// Step 2: Backend Token Verification Route
// Backend mein ek route bana lo jo token verify kare. Agar token valid hai, to success response bhej do, aur agar token invalid hai to error.

// Example backend route:


const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/verify-token/:token", (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.FORGET_SECRET_KEY);
    return res.json({ valid: true, userId: decoded.userId });
  } catch (error) {
    return res.status(400).json({ valid: false, message: "Invalid or expired token" });
  }
});

module.exports = router;



// Step 3: Invalid Token Page
// Agar token invalid ya missing ho, to tum ek "Invalid Token" page dikha sakte ho:

const InvalidToken = () => {
    return (
      <div>
        <h2>Invalid or Expired Token</h2>
        <p>The token you provided is either invalid or has expired. Please try resetting your password again.</p>
      </div>
    );
  };
  
  export default InvalidToken;
  

//   Summary:
// Frontend se token verify karo using useEffect.
// Backend route /verify-token/:token create karo to validate the token.
// Agar token invalid hai to user ko error page pe redirect kar do.
// Is se tum ensure kar sakte ho ki user tabhi reset password page pe ja payega jab token valid hoga.