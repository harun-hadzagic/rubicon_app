import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Link to={`/`}>
        <h1 className={classes.title}>Movies and TV shows, all in one place</h1>
      </Link>
    </React.Fragment>
  );
};
export default Header;
