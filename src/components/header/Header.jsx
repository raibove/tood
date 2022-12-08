import "./Header.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

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
  return (
    <div className="header">
      <img src={Logo} className="header-logo" onClick={navigteToHome} />
      <div className="login-button-container">
        {cookies.jwt ? (
          <button className="landing-button" onClick={handleLogout}>
            Logout
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
