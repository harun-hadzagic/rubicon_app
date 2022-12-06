import React from "react";
import classes from "./NavBar.module.css";
const NavBar: React.FC<{
  moviesAreOpen: boolean;
  setSeries: () => void;
  setMovies: () => void;
}> = (props) => {
  return (
    <div className={classes.NavBar}>
      <button
        onClick={props.setSeries}
        className={props.moviesAreOpen ? "" : classes.tv_button}
      >
        TV Shows
      </button>
      <button
        onClick={props.setMovies}
        className={props.moviesAreOpen ? classes.tv_button : ""}
      >
        Movies
      </button>
    </div>
  );
};

export default NavBar;
