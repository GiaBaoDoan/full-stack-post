import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";

function App() {
  return <div className="App">Helo các bạn</div>;
}
export const Layout = () => {
  return (
    <div className="container w-[70%] my-10 mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default App;
