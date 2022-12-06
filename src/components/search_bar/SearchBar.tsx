import classes from "./SearchBar.module.css";

const SearchBar: React.FC<{
  search: string;
  setSearch: (text: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <div className={classes.searchBar}>
      <label>
        <input
          type="text"
          placeholder="Search"
          value={search}
          id="search"
          onChange={(event) => setSearch(event.target.value)}
        ></input>
      </label>
    </div>
  );
};

export default SearchBar;
