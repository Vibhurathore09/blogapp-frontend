import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
// const haha = document.getElementById;
const Sidebar = () => {
  const PF = "http://localhost:5000/images/";
  const [cats, setCats] = useState([]);
  const { user } = useContext(Context);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About ME</span>
        <img src={PF + user.profilePic} alt="" className="sideProfilePic" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia sit
          harum cumque aspernatur assumenda perspiciatis commodi animi ipsam
        </p>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cats.map((e) => (
              <Link
                to={`/?cat=${e.name}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li className="sidebarListItem">{e.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Follow ME</span>
          <div className="sidebarSocial">
            <FacebookIcon className="sidebarIcon" />
            <InstagramIcon className="sidebarIcon" />
            <TwitterIcon className="sidebarIcon" />
            <GitHubIcon className="sidebarIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
