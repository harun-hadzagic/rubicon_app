import { useEffect, useState } from "react";
import NavBar from "../components/navigation_bar/NavBar";
import SearchBar from "../components/search_bar/SearchBar";
import ContentList from "../components/ContentList";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";

function DefaultPage() {
  const [searchParams] = useSearchParams();

  const initialMoviesActive = searchParams?.get("category") === "movies";
  const initialSearch = searchParams?.get("search") || "";

  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moviesActive, setMoviesActive] = useState(initialMoviesActive);
  const [search, setSearch] = useState(initialSearch);
  const [prevSearch, setPrevSearch] = useState("");

  const fetchContent = () => {
    let link = "https://api.themoviedb.org/3";
    const apiCategory = moviesActive ? "movie" : "tv";
    if (search.length >= 3) {
      link += `/search/${apiCategory}?query=${search}`;
    } else {
      link += `/trending/${apiCategory}/week?`;
    }
    link += "&api_key=32f750ec34a701c8662379c9243ca58d";

    setIsLoading(true);
    setError(null);

    fetch(link)
      .then((res) => res.json())
      .then((search) => {
        const data = search.results
          .slice(0, 10)
          .map(
            (item: {
              id: string;
              original_title: string;
              name: string;
              backdrop_path: string;
            }) => {
              return {
                id: item.id,
                title: moviesActive ? item.original_title : item.name,
                backdrop: item.backdrop_path,
              };
            }
          );
        setContent(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setSearchContent = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchContent();
        window.history.pushState(
          {},
          "",
          `/search?search=${search}&category=${moviesActive ? "movies" : "tv"}`
        );
      },
      search !== prevSearch ? 1000 : 0
    );
    setPrevSearch(search);

    return () => {
      clearTimeout(timer);
    };
  }, [search, moviesActive]);

  return (
    <div>
      <NavBar
        setMovies={() => setMoviesActive(true)}
        setSeries={() => setMoviesActive(false)}
        moviesAreOpen={moviesActive}
      />
      <SearchBar setSearch={setSearchContent} search={search}></SearchBar>
      {isLoading && <LoadingSpinner />}
      {error && <p>Unexpected error occured, please try again later.</p>}
      <ContentList
        category={moviesActive ? "movies" : "tv"}
        content={content}
      />
    </div>
  );
}

export default DefaultPage;
