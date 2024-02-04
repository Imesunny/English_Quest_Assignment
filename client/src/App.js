import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import axios from "axios";

function App() {
  axios.defaults.baseURL = `http://localhost:8080`;
  return (
    <div className="App">
       
        <Navbar />
        <AllRoutes />
    </div>
  );
}

export default App;
