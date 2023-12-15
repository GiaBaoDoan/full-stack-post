import React from "react";
import Logo from "../assets/img/logo.png";
import { lightGreen } from "../contanst/color";
const Footer = () => {
  return (
    <div style={{ backgroundColor: lightGreen }} className="flex items-center ">
      <img src={Logo} style={{ width: "150px" }} alt="" />
      <p>
        Made with love and <span className="font-bold">React js </span>{" "}
      </p>
    </div>
  );
};

export default Footer;
