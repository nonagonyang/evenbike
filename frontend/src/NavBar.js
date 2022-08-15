import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>

      <NavLink to="/trip">Trip</NavLink>

      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
}

export default NavBar;
