import React from "react";
import "./header.css";
function Header({ title, contentHeader }) {
  return (
    <header className="header">
      <div className="container">
        <h1 className="title">{title} </h1>
        {contentHeader}
      </div>
    </header>
  );
}

export default Header;
Header.defaultProps = {
  title: "Welcome ",
  contentHeader:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco labori nisi ut aliquip ex ea commodo consequat",
};
