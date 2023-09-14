import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import '../css/menu.css'

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`../upload/${post?.img}`} alt="" />
          </div>
          <div className="content">
            <h2>{post.title}</h2>
            <h3>{post.tag}</h3>
            <Link className="button" to={`/post/${post.id}`}>Read More</Link> {/* Use Link here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
