import React, { useEffect, useState, useContext } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import '../css/single.css'
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="single">
      <div className="content">
        {post && post.img && <img src={`../upload/${post.img}`} alt="" />}
        <div className="user">
          {post && post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            {post && post.username && <span>{post.username}</span>}
            {post && post.date && <p>Posted {moment(post.date).fromNow()}</p>}
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img  className="img"  src={Edit} alt="edit" />
              </Link>
              <img  className="img"  onClick={handleDelete} src={Delete} alt="Delete" />
            </div>
          )}
        </div>
        {post && post.title && <h1>{post.title}</h1>}
        {post && post.desc && (
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>
        )}
      </div>
      {post && post.cat && <Menu cat={post.cat} />}
    </div>
  );
};

export default Single;
