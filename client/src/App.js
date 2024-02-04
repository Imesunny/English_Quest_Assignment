import "./App.css";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import axios from "axios";

function App() {
  // axios.defaults.baseURL = `http://localhost:8080`;
  axios.defaults.baseURL = `https://blue-combative-harp-seal.cyclic.app`
  return (
    <div className="App">
       
        <Navbar />
        <AllRoutes />
    </div>
  );
}

export default App;
