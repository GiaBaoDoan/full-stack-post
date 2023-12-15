import React, { useContext } from "react";
import Logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { lightGreen } from "../contanst/color";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const links = ["art", "sicence", "technology", "design", "cinema", "food"];
  const { currentUser, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar mt-10">
      <div className="container flex justify-between items-center">
        <div className="Logo cursor-pointer" onClick={() => navigate("/")}>
          <img style={{ width: "150px" }} src={Logo} alt="" />
        </div>
        <div className="Links flex space-x-4 items-center">
          {links.map((item) => {
            return (
              <Link to={`/?cat=${item}`} className="uppercase  text-xl">
                <h5>{item}</h5>
              </Link>
            );
          })}
          <span className="font-bold">{currentUser?.userName}</span>
          {currentUser ? (
            <span className="font-bold">
              <Link onClick={Logout} to={"/Login"}>
                LOGOUT
              </Link>
            </span>
          ) : (
            <span className="font-bold">
              <Link onClick={Logout} to={"/Login"}>
                LOGIN
              </Link>
            </span>
          )}

          <span
            style={{ backgroundColor: lightGreen }}
            className="p-4 font-medium transition-all cursor-pointer hover:!bg-white hover:text-teal-400 rounded-full w-14 h-14 flex justify-center items-center"
          >
            <Link to={"/write"}>Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
