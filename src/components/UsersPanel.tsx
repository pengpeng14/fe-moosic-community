import React, { useContext, useEffect, useState } from "react";
import { IPanel } from "../interfaces/IPanel";
import { SearchUserData } from "../interfaces/user/UserProfile";
import search from "../services/search";
import SearchFeedStyle from "../styles/SearchFeedStyle";
import UtilStyle from "../styles/UtilStyle";
import { SearchContext } from "./SearchFeed";
import UserCard from "./UserCard";

const UsersPanel: React.FC<IPanel> = ({ value, index }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { keyword } = useContext(SearchContext);
  const [users, setUsers] = useState<SearchUserData>();

  useEffect(() => {
    const findUsers = async () => {
      const response = await search.searchUsers(keyword, 0);
      if (response.success) {
        setUsers(response);
        setLoading(false);
      }
    };

    findUsers();
  }, [keyword]);

  return (
    <>
      {value === index && (
        <>
          <div
            style={{
              display: "grid",
              gridRowGap: 15,
              marginBottom: 30,
            }}
          >
            {users?.data.contents.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
          {loading ? (
            <UtilStyle.Loading>Loading...</UtilStyle.Loading>
          ) : !users?.data.contents.length ? (
            <SearchFeedStyle.ResultText>
              {`No users "${keyword}" found`}
            </SearchFeedStyle.ResultText>
          ) : null}
        </>
      )}
    </>
  );
};

export default UsersPanel;
