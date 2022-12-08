import "./Header.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");
  const [cookies] = useCookies(["cookie-name"]);

  const navigteToHome = () => {
    if (cookies.jwt) {
      navigate("/to-do");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="header">
      <img src={Logo} className="header-logo" onClick={navigteToHome} />
      <div className="login-button-container">
        <button className="landing-button" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
