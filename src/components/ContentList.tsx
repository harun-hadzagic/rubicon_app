import React from "react";
import Item from "./Item";
import classes from "./ContentList.module.css";

const ContentList: React.FC<{
  content: { id: string; title: string; backdrop: string }[];
  category: string;
}> = (props) => {
  return (
    <div className={classes.card}>
      {props.content?.map((item) => (
        <Item
          key={item.id}
          category={props.category}
          id={item.id}
          title={item.title}
          backdrop={item.backdrop}
        />
      ))}
      {props.content.length === 0 && (
        <p className={classes.no_results_found}>
          There are no search results matching your search
        </p>
      )}
    </div>
  );
};

export default ContentList;
