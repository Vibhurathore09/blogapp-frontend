import React, { useContext } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import { Context } from "../../context/Context";
const Topbar = () => {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    window.location.replace("/register");
  };
  return (
    <div className="top">
      <div className="topLeft">
        <FacebookIcon className="topIcon" />
        <InstagramIcon className="topIcon" />
        <TwitterIcon className="topIcon" />
        <GitHubIcon className="topIcon" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <li className="topListItem">HOME</li>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="about">
            <li className="topListItem">ABOUT</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="contact"
          >
            <li className="topListItem">CONTACT</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/write"
          >
            <li className="topListItem">WRITE</li>
          </Link>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            className="link"
            to="/settings"
          >
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                className="link"
                to="/login"
              >
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                className="link"
                to="/register"
              >
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <SearchIcon className="topSearchIcon" />
      </div>
    </div>
  );
};

export default Topbar;
