import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies] = useCookies(["jwt"]);

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/to-do");
    } else {
      navigate("/");
      setLoading(false);
    }
  }, []);

  const handleClick = () => navigate("/register");
  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <div className="landing">
          <p className="landing-title">
            See the Big Picture: Get Organized with Tood
          </p>
          <button className="landing-button" onClick={handleClick}>
            Sign up now
          </button>
        </div>
      )}
    </>
  );
};

export default Landing;
