import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
const URL = import.meta.env.VITE_BASE_URL;

const Headers = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const logout = () => {
    fetch(`${URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };
  return (
    <header>
      <Link to={"/"} className="logo">
        SE NPRU BLOG
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"} className="nav-link">
              Create 
            </Link>
            <a onClick={logout} className="hoverLogout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Headers;
