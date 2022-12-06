import React from "react";
import { Link } from "react-router-dom";
import classes from "./Item.module.css";

const Item: React.FC<{
  backdrop: string;
  category: string;
  id: string;
  title: string;
}> = (props) => {
  let imgSrc = "https://image.tmdb.org/t/p/w500/" + props.backdrop;
  let noImageFound =
    "https://media.istockphoto.com/id/1396039964/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=hzLqz1qI7UtmGgCRRdGXghrNPE8zg8a0D6SgRQ8AiIA=";
  return (
    <Link to={`/${props.category}/${props.id}`}>
      <div className={classes.item}>
        <img
          src={imgSrc.length > 40 ? imgSrc : noImageFound}
          alt="backdrop"
        ></img>
        <h2>{props.title}</h2>
      </div>
    </Link>
  );
};

export default Item;
