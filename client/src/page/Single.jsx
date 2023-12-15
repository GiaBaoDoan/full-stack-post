import React, { useContext, useEffect, useState } from "react";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Menu from "../components/Menu";
const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const location = useLocation();
  const [post, setPost] = useState({});
  const postId = location.pathname.split("/")[2];
  console.log("img >>", post.img);
  const fetchSinglePost = async () => {
    try {
      const res = await axios.get(`/post/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handelDelete = async () => {
    try {
      await axios.delete(`/post/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    <div className="my-10">
      <div className="flex gap-[40px] ">
        <div className="w-[75%]">
          <div className="w-full">
            <img src={`../upload/${post.img}`} alt="" />
            <div className="my-4 flex items-center space-x-2 ">
              <img
                className="h-16 w-16 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_xiGdXVs1HSUY7_iohrlUOHjaGe2_a_7Yg&usqp=CAU"
                alt=""
              />
              <div className="">
                <p className="font-bold">{post.userName}</p>
                <p>Posted {moment([2023, 11, 10]).fromNow()}</p>
              </div>
              <div className="flex space-x-2">
                <Link state={post} to={`/write?edit=2`}>
                  <img className="w-10 h-10" src={Edit} alt="" />
                </Link>
                <img
                  onClick={handelDelete}
                  className="w-10 h-10"
                  src={Delete}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="content space-y-10 w-full">
            <h1 className="font-bold text-5xl leading-[55px] ">{post.title}</h1>

            <p className="text-2xl leading-[50px]">{getText(post.desc)}</p>
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl font-medium my-5 text-gray-900">
            Other new post you may like
          </h1>
          <div className="posts space-y-20">
            <Menu cat={post?.cat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
