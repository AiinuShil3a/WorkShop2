import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Headers = () => {
  return (
    <header>
      <Link to={"/"} className="logo">
        SE NPRU BLOG
      </Link>
      <nav>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
        <Link to={"/register"} className="nav-link">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Headers;
