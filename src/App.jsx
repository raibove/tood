import Header from "./components/header/Header";
import "./App.css";
import D3Pie from "./components/d3Pie/D3Pie";
import Landing from "./components/landing/Landing";
import Register from "./components/register/Register";
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Register title="Login" />} />
          <Route path="/register" element={<Register title="Register" />} />
          <Route path="/to-do" element={<D3Pie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
