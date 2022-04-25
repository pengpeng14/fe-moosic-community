import React, { useEffect, useState } from "react";
import KeywordBadge from "./KeywordBadge";
import BadgeStyle from "../styles/BadgeStyle";
import { useSearchParams } from "react-router-dom";
import useSearch from "./../custom hooks/useSearch";
import { useNavigate } from "react-router";
import search from "../services/search";

interface IData {
  moods: string[];
  setSelectedKeyword: (keyword: string) => void;
  selectedKeyword: string;
}

const MoodBadge: React.FC<IData> = ({
  moods,
  selectedKeyword,
  setSelectedKeyword,
}) => {
  const [value, setValue] = useState<number>(0);
  // const searchParam = useSearch<{ m: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // setSelectedKeyword(searchParam.m);
    setSelectedKeyword(moods[0]);
  }, [moods]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const filterKeyword = (keyword: string) => {
    // navigate(`/moods?m=${keyword}`)
    setSelectedKeyword(keyword);
  };

  return (
    <div style={{ width: "100%" }}>
      <BadgeStyle.TabsContainer
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        style={{ backgroundColor: "transparent" }}
        onChange={handleChangeTab}
        change={true}
      >
        {moods.map((mood, index) => (
          <KeywordBadge
            key={index}
            keyword={mood}
            handleClick={filterKeyword}
            selectedKeyword={selectedKeyword}
          />
        ))}
      </BadgeStyle.TabsContainer>
    </div>
  );
};

export default MoodBadge;
