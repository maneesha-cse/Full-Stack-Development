
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>MERN CRUD Blog App</h1>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/create-post">Create Post</Link>
      </nav>
    </header>
  );
}

export default Header;
