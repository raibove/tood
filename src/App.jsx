import Header from "./components/header/Header";
import "./App.css";
import D3Pie from "./components/d3Pie/D3Pie";
import Landing from "./components/landing/Landing";
import Register from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <D3Pie /> */}
      {/* <Landing /> */}
      {/* <Register title="Register" /> */}
      <Register title="Login" />
    </div>
  );
}

export default App;
