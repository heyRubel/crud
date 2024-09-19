import { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [removeToken,setRemoveToken]=useState('')

const x=()=>{
  localStorage.removeItem("user")
  setRemoveToken("h")
}
  return (
    <nav className="nav_bar">
      <ul className="nav_list">
        {localStorage.getItem("user") ? (
          <>
            <li
              style={{ color: "white", cursor: "pointer" }}
              className="nav_item"
              onClick={x}
            >
              Logout
            </li>
            <li className="nav_item">
              <Link className="nav_link" to="/">
                Product List
              </Link>
            </li>
            <li className="nav_item">
              <Link className="nav_link" to="/add-product">
                Add Product
              </Link>
            </li>
           
          </>
        ) : (
          <>
            
            <li className="nav_item">
              <Link className="nav_link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav_item">
              <Link className="nav_link" to="/signup">
                SignUp
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
