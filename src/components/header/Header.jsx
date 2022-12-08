import "./Header.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");
  return (
    <div className="header">
      <img src={Logo} className="header-logo" />
      <div className="login-button-container">
        <button className="landing-button" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
