import "./Header.css";
import Logo from "../../assets/logo.png";
const Header = () => {
  return (
    <div className="header">
      <img src={Logo} className="header-logo" />
    </div>
  );
};

export default Header;
