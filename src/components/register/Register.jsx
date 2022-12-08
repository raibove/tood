import "./Register.css";
import { Input } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { notification } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Register = ({ title }) => {
  const [cookies] = useCookies(["jwt"]);
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/to-do");
    } else {
      setLoading(false);
    }
  }, []);

  const openNotificationWithIcon = (type, notifyTitle) => {
    api[type]({
      message: notifyTitle,
    });
  };

  const userRegister = async () => {
    try {
      let response = await axios.post("/api/auth/register", {
        email: email,
        password: password,
      });

      openNotificationWithIcon("success", "User Registration Successful");
      navigate("/to-do");
    } catch (err) {
      console.log(err);
      notifyError(err);
    }
  };

  const userLogin = async () => {
    try {
      let response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      openNotificationWithIcon("success", "User Login Successful");
      navigate("/to-do");
    } catch (err) {
      console.log(err);
      notifyError(err);
    }
  };

  const notifyError = (err) => {
    if (
      err.response.data != undefined &&
      err.response.data.errors != undefined
    ) {
      let errors = err.response.data.errors;
      if (errors.email != "") openNotificationWithIcon("error", errors.email);
      else if (errors.password != "")
        openNotificationWithIcon("error", errors.password);
      else openNotificationWithIcon("error", "Authentication Failed");
    } else {
      openNotificationWithIcon("error", "Authentication Failed");
    }
  };

  const authenticateUser = () => {
    if (title === "Login") userLogin();
    else userRegister();
  };
  return (
    <>
      {contextHolder}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="register">
          <div className="register-container">
            <h3>{title}</h3>
            <div className="register-input">
              <label>Email</label>
              <Input
                placeholder="email"
                size="large"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="register-input">
              <label>Password</label>
              <Input.Password
                placeholder="password"
                size="large"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="register-button-container">
              <button className="register-button" onClick={authenticateUser}>
                {title}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
