import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./DetailsPage.module.css";

const DetailsPage: React.FC<{ type: string }> = (props) => {
  const [details, setDetails] = useState<any>([]);
  const [video, setVideo] = useState<boolean[]>([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      let link = `https://api.themoviedb.org/3/${
        props.type === "movie" ? "movie" : "tv"
      }/${id}?api_key=32f750ec34a701c8662379c9243ca58d
    `;
      let respons = fetch(link);
      let data = await (await respons).json();
      setDetails(data);
    };
    const fetchVideo = async () => {
      let link = `https://api.themoviedb.org/3/${
        props.type === "movie" ? "movie" : "tv"
      }/${id}/videos?api_key=32f750ec34a701c8662379c9243ca58d
    `;
      let respons = fetch(link);
      let data = await (await respons).json();
      setVideo(
        data.results.find(
          (element: { type: string; official: boolean }) =>
            element.type === "Trailer" && element.official === true
        ).key
      );
    };

    fetchDetails();
    fetchVideo();
  }, [id, props.type]);

  let imgSrc = "https://image.tmdb.org/t/p/w500/" + details.backdrop_path;
  let noImageFound =
    "https://media.istockphoto.com/id/1396039964/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=hzLqz1qI7UtmGgCRRdGXghrNPE8zg8a0D6SgRQ8AiIA=";
  return (
    <div className={classes.details_page}>
      {details.success !== false ? (
        <>
          <h2>
            {props.type === "movie" ? details.original_title : details.name}
          </h2>
          {video.length !== 0 ? (
            <iframe
              title="trailer"
              width="420"
              height="315"
              src={"https://www.youtube.com/embed/" + video}
            />
          ) : (
            <img
              src={imgSrc.length > 40 ? imgSrc : noImageFound}
              alt="backdrop"
            ></img>
          )}
          <p>
            A shot description: <br></br>
            {details.overview}
          </p>
          <p>
            Original language:&nbsp;
            {details.original_language}
          </p>
          <p>
            The content is
            {details.adult ? " not " : " "}suitable for children.
          </p>
          <p>
            Average rating:&nbsp;
            {details.vote_average}
          </p>
        </>
      ) : (
        <p>Whoops, no movie was found!</p>
      )}
    </div>
  );
};

export default DetailsPage;
