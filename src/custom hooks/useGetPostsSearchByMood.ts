import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchPostsDataNoRaw
} from "../interfaces/post/Posts";
import search from "../services/search";

const useGetPostsSearch = (pageNumber: number, keyword: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [moodPosts, setMoodPosts] = useState<SearchPostsDataNoRaw>();
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword)

  const navigate = useNavigate();

  useEffect(() => {
    const getAllPosts = async () => {
      await search
        .searchMoods(keyword, pageNumber)
        .then(({ data }) => {
          console.log(data);
          setMoodPosts((prevState) =>
            keyword === searchKeyword && prevState
              ? {
                  ...prevState,
                  totalPage: data.totalPage,
                  page: data.page,
                  count: data.count,
                  contents: [...prevState.contents, ...data.contents],
                }
              : data
          );
          setSearchKeyword(keyword)
          setHasMore(data.totalPage > 0 && pageNumber < data.totalPage);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);

          // if (e.message === "Not found access token for authorization") {
          //   navigate("/login");
          // }
          // navigate("/login");
          // localStorage.clear();
          // setError(true);
        });
    };
    setLoading(true);
    setError(false);
    getAllPosts();

    return () => {};
  }, [pageNumber, keyword]);

  return { loading, hasMore, error, moodPosts };
};

export default useGetPostsSearch;
