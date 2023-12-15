import React, { useState } from "react";
import { lightGreen } from "../contanst/color";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
const Regsiter = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handelInput = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  console.log(inputs);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", inputs);
      if (res.data) {
        alert("Đăng kí thành công");
        setTimeout(() => navigate("/Login"), 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ backgroundColor: lightGreen }} className="">
      <div className="justify-center flex h-[100vh] items-center flex-col space-y-5 ">
        <h1 className="font-bold text-4xl text-teal-500">Register</h1>

        <form
          action=""
          className="flex-col flex bg-white w-[400px] space-y-10 p-12 rounded-md shadow-md"
        >
          <div className="border-b-gray-400 border-b p-2">
            <input
              required
              type="text"
              name="email"
              placeholder="Email"
              onChange={handelInput}
              className="outline-none text-gray-500 w-full"
            />
          </div>
          <div className="border-b-gray-400 border-b p-2">
            <input
              required
              type="text"
              name="userName"
              placeholder="UserName"
              onChange={handelInput}
              className="outline-none text-gray-500 w-full"
            />
          </div>
          <div className="border-b-gray-400 border-b p-2">
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={handelInput}
              className="outline-none text-gray-500 w-full"
            />
          </div>
          <button
            onClick={handelSubmit}
            className="text-white rounded-md font-bold p-4 shadow-sm bg-teal-500 transition-all hover:bg-teal-700"
          >
            Register
          </button>
          <div className="text-center">
            <span>
              Do you have an account?{" "}
              <Link
                to={"/Login"}
                className="text-teal-400 hover:text-teal-600 transition-all underline"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Regsiter;
