import React from "react";
import "./Header.css";
import cover from "./cover.jpg";
const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <div className="imgHeader">
        <img src={cover} className="headerImg" alt="" />
      </div>
    </div>
  );
};

export default Header;
