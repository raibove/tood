import "./Header.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [checkCookie, setCheckCookie] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");

  useEffect(() => {
    if (cookies.jwt) {
      setCheckCookie(true);
    } else {
      setCheckCookie(false);
    }
  }, [cookies, navigate]);

  const navigteToHome = () => {
    if (cookies.jwt) {
      navigate("/to-do");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    removeCookie("jwt");
    navigate("/");
  };

  const isLoginPage = () => {
    const nameUrl = window.location.href;
    const uri = nameUrl.split("/");
    if (uri[uri.length - 1] === "login") return true;
    return false;
  };

  return (
    <div className="header">
      <img src={Logo} className="header-logo" onClick={navigteToHome} />
      <div className="login-button-container">
        {checkCookie ? (
          <button className="landing-button" onClick={handleLogout}>
            Logout
          </button>
        ) : isLoginPage() ? (
          <button
            className="landing-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        ) : (
          <button className="landing-button" onClick={handleClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
