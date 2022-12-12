import "./Register.css";
import { Input, Button } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { notification } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Register = ({ title }) => {
  const maxAge = 3 * 24 * 60 * 60;

  const [axiosLoading, setAxionsLoading] = useState(false);
  let baseURL = process.env.REACT_APP_BASE_URL;
  const [cookies, setCookie] = useCookies();
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

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const userRegister = async () => {
    setAxionsLoading(true);
    try {
      if (!validateEmail()) {
        setAxionsLoading(false);
        return openNotificationWithIcon("error", "Invalid email");
      }
      // if (baseURL != undefined) {
      //   let response = await axios.post(`${baseURL}/api/auth/register`, {
      //     email: email,
      //     password: password,
      //   });
      //   setCookie("jwt", response.data.token, {
      //     secure: true,
      //     sameSite: "none",
      //     maxAge: maxAge * 1000,
      //   });
      // } else {
      await axios.post(`/api/auth/register`, {
        email: email,
        password: password,
      });
      setCookie("jwt", response.data.token, {
        secure: true,
        sameSite: "none",
        maxAge: maxAge * 1000,
      });
      // }

      setAxionsLoading(false);
      openNotificationWithIcon("success", "User Registration Successful");
      // navigate("/to-do");
      let homeUrl = window.location.origin;
      window.location.replace(homeUrl + "/to-do");
    } catch (err) {
      console.log(err);
      setAxionsLoading(false);
      notifyError(err);
    }
  };

  const userLogin = async () => {
    setAxionsLoading(true);
    try {
      // if (baseURL != undefined) {
      //   let response = await axios.post(`${baseURL}/api/auth/login`, {
      //     email: email,
      //     password: password,
      //   });
      //   setCookie("jwt", response.data.token, {
      //     secure: true,
      //     sameSite: "none",
      //     maxAge: maxAge * 1000,
      //   });
      // } else {
      let response = await axios.post(`/api/auth/login`, {
        email: email,
        password: password,
      });
      setCookie("jwt", response.data.token, {
        secure: true,
        sameSite: "none",
        maxAge: maxAge * 1000,
      });
      // }
      setAxionsLoading(false);
      openNotificationWithIcon("success", "User Login Successful");
      let homeUrl = window.location.origin;
      window.location.replace(homeUrl + "/to-do");
    } catch (err) {
      setAxionsLoading(false);
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
              <Button
                size="large"
                loading={axiosLoading}
                className="register-button"
                onClick={authenticateUser}
              >
                {title}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
