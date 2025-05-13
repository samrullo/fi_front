import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/positions" className="nav-link">
                Positions
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarViewDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                View
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarViewDropdown">
                <li>
                  <Link className="dropdown-item" to="/curve-points">
                    Curve Points
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/curve-point-shocks">
                    Curve Point Shocks
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/stress-scenarios">
                    Stress Scenarios
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/vanilla-bonds">
                    Vanilla Bonds
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/scenario-positions">
                    Scenario Positions
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/risk-cores">
                    Risk Core
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;