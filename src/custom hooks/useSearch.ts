import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";

const useSearch = <T>() => {
  const location = useLocation();
  const [search, setSearch] = useState<queryString.ParsedQuery<string>>();

  useEffect(() => {
    const result = queryString.parse(location.search);
    setSearch(result);
  }, [location]);

  return search as unknown as T;
};

export default useSearch;