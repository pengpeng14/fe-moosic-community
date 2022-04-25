import { Tab } from "@mui/material";
import React from "react";
import BadgeStyle from "../styles/BadgeStyle";

interface IData {
  keyword: string;
  handleClick: (keyword: string) => void;
  selectedKeyword: string;
  change?: boolean;
}

const KeywordBadge: React.FC<IData> = ({
  keyword,
  handleClick,
  selectedKeyword,
  change,
}) => {
  return (
    <>
      <BadgeStyle.Badge
        onClick={() => handleClick(keyword)}
        style={{
          cursor: "pointer",
          backgroundColor:
            selectedKeyword === keyword ? "rgb(135,37,180)" : "white",
          color: selectedKeyword === keyword ? "white" : "black",
          opacity: 1,
          marginLeft: "2px"
        }}
        change={change ?? false}
      >
        {keyword}
      </BadgeStyle.Badge>
    </>
  );
};

export default KeywordBadge;
