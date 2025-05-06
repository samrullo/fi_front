import React from "react";
import { useContext } from "react";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";
import Logout from "./user_management/Logout";

const NavBar = ({ title }) => {
  const {
    dummyAppVariable,

    anotherDummyAppVariable,

    isAuthenticated,
  } = useContext(AppContext);

  console.log(`dummyAppVariable value is ${dummyAppVariable}`);
  console.log(`anotherDummyAppVariable value is ${anotherDummyAppVariable}`);

  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <Link className="navbar-brand" to="/">
        {title}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynavigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="mynavigation">
        <div className="navbar-nav ml-auto">
          <Link to="/positions/20250425" className="nav-link">
            US IG Positions
          </Link>
          
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
