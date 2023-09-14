import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import "../css/navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=react">
            <h6>REACT JS</h6>
          </Link>
          <Link className="link" to="/?cat=nodejs">
            <h6>NODE JS</h6>
          </Link>
          <Link className="link" to="/?cat=sql">
            <h6>SQL</h6>
          </Link>
          <Link className="link" to="/?cat=javascript">
            <h6>JAVASCRIPT</h6>
          </Link>
          <Link className="link" to="/?cat=html">
            <h6>HTML</h6>
          </Link>
          <Link className="link" to="/?cat=css">
            <h6>CSS</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span   onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;