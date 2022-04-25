import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ISearchURL } from "../interfaces/ISearchURL";
import SearchBoxStyle from "../styles/SearchBoxStyle";
import useSearch from "./../custom hooks/useSearch";

const SearchBox: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const searchParam = useSearch<ISearchURL>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!searchParam) {
      return;
    }

    setInput(searchParam.keyword);

  }, [searchParam]);

  useEffect(() => {
    if (!location.pathname.includes("search")) {
      setInput("");
    }
  }, [location.pathname])

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    if (!location.pathname.includes("search")) {
      return navigate(`/search?type=posts&keyword=${input}`);
    }

    navigate(`/search?type=${searchParam.type.toString()}&keyword=${input}`);
  };

  return searchParam ? (
    <div style={{ position: "relative", maxWidth: "inherit" }}>
      <SearchBoxStyle.SearchFieldStyle
        value={input}
        placeholder="Search..."
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleSearch}
      ></SearchBoxStyle.SearchFieldStyle>
      <SearchBoxStyle.IconStyle src="/assets/icons/search.png" />
      {/* <SearchBoxStyle.ButtonStyle>
      </SearchBoxStyle.ButtonStyle> */}
    </div>
  ) : null;
};

export default SearchBox;
