import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/register");
  return (
    <div className="landing">
      <p className="landing-title">
        See the Big Picture: Get Organized with Tood
      </p>
      <button className="landing-button" onClick={handleClick}>
        Sign up now
      </button>
    </div>
  );
};

export default Landing;
