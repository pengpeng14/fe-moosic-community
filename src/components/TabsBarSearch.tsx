import { Tab, Tabs } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchType } from "../interfaces/ISearchURL";
import MoodsPanel from "./MoodsPanel";
import PostsPanel from "./PostsPanel";
import { SearchContext } from "./SearchFeed";
import UsersPanel from "./UsersPanel";
import "./../styles/TabsBarCSS.css";

// interface IFeed {
//   posts: SearchPostsData | undefined;
// }

const TabsBarSearch: React.FC = () => {
  const [pValue, setPValue] = useState(0);
  const searchParam = useContext(SearchContext)
  // const searchParam = {};
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const val = parseInt(SearchType[searchParam.type.valueOf()]);
    setPValue(val);
  }, [searchParam]);

  const handlePanelChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(`/search?type=${SearchType[newValue].toString()}&keyword=${searchParam.keyword}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={pValue}
          onChange={handlePanelChange}
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{ width: "100%" }}
        >
          <Tab
            label="Posts"
            id={`simple-tabpanel-0`}
            aria-labelledby={`simple-tab-0`}
          />
          <Tab
            label="Moods"
            id={`simple-tabpanel-1`}
            aria-labelledby={`simple-tab-1`}
          />
          <Tab
            label="User"
            id={`simple-tabpanel-2`}
            aria-labelledby={`simple-tab-2`}
          />
        </Tabs>
      </div>
      <div style={{ marginBottom: "20px" }} />
      <PostsPanel index={0} value={pValue} />
      <MoodsPanel index={1} value={pValue} />
      <UsersPanel index={2} value={pValue} />
    </>
  );
};

export default TabsBarSearch;
