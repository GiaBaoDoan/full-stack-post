import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { lightGreen } from "../contanst/color";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });
  const { Login, currentUser } = useContext(AuthContext);
  const handelInputs = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handelOnClick = async (e) => {
    e.preventDefault();
    try {
      await Login(inputs);
      if (currentUser) {
        setTimeout(() => alert("Đăng nhập thành công"), 500);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ backgroundColor: lightGreen }} className="">
      <div className="justify-center flex h-[100vh] items-center flex-col space-y-5 ">
        <h1 className="font-bold text-4xl text-teal-500">Login</h1>

        <form
          action=""
          className="flex-col flex bg-white w-[400px] space-y-10 p-12 rounded-md shadow-md"
        >
          <div className="border-b-gray-400 border-b p-2">
            <input
              type="text"
              name="userName"
              onChange={handelInputs}
              placeholder="userName"
              className="outline-none text-gray-500 w-full"
            />
          </div>
          <div className="border-b-gray-400 border-b p-2">
            <input
              type="password"
              name="password"
              onChange={handelInputs}
              placeholder="Password"
              className="outline-none text-gray-500 w-full"
            />
          </div>
          <button
            onClick={handelOnClick}
            className="text-white rounded-md font-bold p-4 shadow-sm bg-teal-500 "
          >
            Login
          </button>
          <div className="text-center">
            <span>
              Don't you have an account?{" "}
              <Link to={"/Register"} className="text-teal-400 underline">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
