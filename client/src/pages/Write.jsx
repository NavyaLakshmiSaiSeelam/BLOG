import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "../css/write.css";
// Make sure to import your CSS file for styling

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [tag, setTag] = useState(state?.tag || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [uploadStatus, setUploadStatus] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      setUploadStatus("success"); // Set upload status to success
      return res.data;
    } catch (err) {
      setUploadStatus("error"); // Set upload status to error
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : "";

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            tag,
            desc: value,
            cat,
            img: imgUrl,
          })
        : await axios.post(`/posts/`, {
            title,
            tag,
            desc: value,
            cat,
            img: imgUrl,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content1">
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu2">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          {uploadStatus === "success" && (
            <span className="upload-success">Image uploaded successfully</span>
          )}
          {uploadStatus === "error" && (
            <span className="upload-error">Image upload failed</span>
          )}

          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "react"}
              name="cat"
              value="react"
              id="react"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="react">REACT</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "nodejs"}
              name="cat"
              value="nodejs"
              id="nodejs"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="nodejs">NODE JS</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "sql"}
              name="cat"
              value="sql"
              id="sql"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sql">SQL</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "javascript"}
              name="cat"
              value="javascript"
              id="javascript"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="javascript">JAVASCRIPT</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "html"}
              name="cat"
              value="html"
              id="html"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="html">HTML</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "css"}
              name="cat"
              value="css"
              id="css"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="css">CSS</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
