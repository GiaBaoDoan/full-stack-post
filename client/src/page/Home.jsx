import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { lightGreen } from "../contanst/color";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const cat = location.search;
  const [posts, setPost] = useState([]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const fetchALLPost = async () => {
    try {
      const res = await axios.get(`post${cat}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchALLPost();
  }, [cat]);
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];
  return (
    <div className="Home my-10">
      <div className="posts space-y-20">
        {posts?.map((item, index) => {
          return (
            <div
              className={`flex ${
                index % 2 == 0 ? "flex-row-reverse" : ""
              } justify-between`}
            >
              <div className="relative self-start">
                <img
                  src={`./upload/${item.img}`}
                  className="w-[400px] rounded "
                  alt=""
                />
                <div
                  style={{ backgroundColor: lightGreen }}
                  className="absolute -z-10 top-6  -left-6 rounded w-[350px] h-full"
                ></div>
              </div>

              <div className="w-[50%] ">
                <Link className="space-y-10" to={`post/${item.id}`}>
                  <p className="font-bold text-5xl">{item.title}</p>
                  <p className="text-2xl ">
                    {getText(item.desc).length > 1000
                      ? getText(item.desc).slice(0, 600) + "..."
                      : getText(item.desc)}
                  </p>
                  <button className="border font-bold transition-all rounded hover:bg-teal-400 hover:text-white border-teal-400 text-teal-400  p-3">
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
