import Header from "./components/header/Header";
import "./App.css";
import D3Pie from "./components/d3Pie/D3Pie";
import Landing from "./components/landing/Landing";
import Register from "./components/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Register title="Login" />} />
          <Route path="/register" element={<Register title="Register" />} />
          <Route
            path="/to-do"
            element={
              <ProtectedRoute>
                <D3Pie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
