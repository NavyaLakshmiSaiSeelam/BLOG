
import {FaGithub, FaHome , FaInstagram, FaLinkedin, FaMailBulk, FaPhone} from "react-icons/fa";
import React from 'react'
import "../css/footer.css";

const footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="left">
                <div className="location">
                    <FaHome size={20} style={{color:"#fff",marginRight : "2rem" }}/>
                    <div> <p>Hyderabad</p>
                    <p>India</p></div>
                </div>
                <div>
                <div className="phone">
                    <h4>
                    <FaPhone size={20} style={{color:"#fff",marginRight : "2rem" }}/>
                    8096459582
                    </h4>
                </div>
                <div className="email">
                    <h4><FaMailBulk size={20} style={{color:"#fff",marginRight : "2rem" }}/>
                    seelamnavya2002@gmail.com
                    </h4>
                    
                </div>
                </div>
            </div>
            <div className="right">
                <p> Please contact me if you have any queries through the following media handles</p>
                <div className="social">
                    <a href="https://www.instagram.com/your-instalink/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
                    <a href="www.linkedin.com/in/navyasaiseelam" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
                    <a href="https://github.com/your-githublink/" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
      </div>
            </div>
        </div>
    </div>
  );
};

export default footer