import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router";
const Write = () => {
  const { state, search } = useLocation();
  const navigate = useNavigate();
  const postId = search.split("=")[1];
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || null);
  const date = moment();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handelOnclik = async (e) => {
    e.preventDefault();
    const img = await upload();
    try {
      !state
        ? await axios.post("post", {
            title: title,
            desc: value,
            img: file ? img : "",
            date: date.format("YYYY-MM-DD"),
            cat: cat,
          })
        : await axios.put(`/post/${postId}`, {
            title: title,
            desc: value,
            img: file ? img : "",
            date: date.format("YYYY-MM-DD"),
            cat: cat,
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-20 flex space-x-[40px]">
      <div className="space-y-4 flex-1 self-stretch">
        <div className="menu">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="p-3 w-full border border-gray-300 outline-none"
          />
        </div>
        <ReactQuill
          placeholder="Write your desc"
          theme="snow"
          className=""
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="space-y-10">
        <div className="border border-gray-300 w-[300px] space-y-2 p-3">
          <h1 className="font-bold text-3xl">Publish</h1>
          <p>
            <span className="font-bold text-xl">Status: </span>
            <span>Draft</span>
          </p>
          <p>
            <span className="font-bold text-xl">Visibility: </span>
            <span>Public</span>
          </p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="file"
          />
          <label className="file" htmlFor="file">
            Upload image
          </label>
          <div className="space-x-2 flex justify-between">
            <button className="border text-teal-400 border-teal-500 p-1">
              Save as a draft
            </button>
            <button
              onClick={handelOnclik}
              className="bg-teal-600 text-white font-medi p-2"
            >
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="border  w-[300px] border-gray-300 p-4">
          <h1 className="font-bold text-3xl ">Category</h1>
          {["Art", "Sicence", "Technology", "Cinema", "Design", "Food"].map(
            (item) => {
              return (
                <div className="space-x-2">
                  <input
                    checked={cat == item}
                    type="radio"
                    name="cat"
                    onChange={(e) => setCat(e.target.value)}
                    value={item}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              );
            }
          )}

          <p>Upload image</p>
        </div>
      </div>
    </div>
  );
};

export default Write;
