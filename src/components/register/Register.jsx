import "./Register.css";
import { Input } from "antd";
const Register = ({ title }) => {
  return (
    <div className="register">
      <div className="register-container">
        <h3>{title}</h3>
        <div className="register-input">
          <label>Email</label>
          <Input placeholder="email" size="large" />
        </div>
        <div className="register-input">
          <label>Password</label>
          <Input.Password placeholder="password" size="large" />
        </div>
        <div className="register-button-container">
          <button className="register-button">{title}</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
