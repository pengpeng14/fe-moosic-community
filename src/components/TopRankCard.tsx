import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Top3Posts } from "../interfaces/post/Posts";
import { clear } from "../reducers/musicSlice";
import { addNewPagePosts } from "../reducers/postsSlice";
import post from "../services/post";
import TopRankCardStyle from "../styles/TopRankCardStyle";
import SmallPostCard from "./SmallPostCard";

const TopRankCard: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<number>(0);
  const [rankPosts, setRankPosts] = useState<Top3Posts>();

  useEffect(() => {
    const getPosts = async () => {
      const response = await post.top3posts();
      console.log("response: ", response);
      if (response.success) {
        setRankPosts(response);
        dispatch(
          addNewPagePosts({
            posts: response.data.posts,
            topPosts: response.data.topPosts,
            totalPage: 0,
            count: 0,
            page: 0,
          })
        );
      }
    };

    getPosts();
  }, []);

  const selectBtn = (index: number) => {
    // console.log("changevalue");
    dispatch(clear());
    setValue(index);
  };

  return (
    <TopRankCardStyle.Container>
      <TopRankCardStyle.PaperCard image={rankPosts?.data.posts[value].post.img}>
        <TopRankCardStyle.Weekly id="title-weekly-top-3">
          Weekly top 3
        </TopRankCardStyle.Weekly>
        <TopRankCardStyle.NRank>#{value + 1}</TopRankCardStyle.NRank>
        {/* space for card */}
        {/* send data with chosen index */}
        {rankPosts?.data.posts.length && (
          <>
            <SmallPostCard
              post={rankPosts?.data.posts[value].post}
              playlist={rankPosts.data.posts[value].playlist}
              music={rankPosts.data.posts[value].music}
              liked={rankPosts.data.posts[value].liked}
            />
          </>
        )}
        <TopRankCardStyle.CarouselContainer>
          {(() => {
            let elements: JSX.Element[] = [];
            for (let i = 0; i < 3; i++) {
              elements.push(
                <div key={i}>
                  <TopRankCardStyle.BtnContainer>
                    <TopRankCardStyle.CarouselIconBtn
                      onClick={() => selectBtn(i)}
                    >
                      <TopRankCardStyle.CarouselBtn selected={value === i} />
                    </TopRankCardStyle.CarouselIconBtn>
                  </TopRankCardStyle.BtnContainer>
                </div>
              );
            }

            return elements;
          })()}
        </TopRankCardStyle.CarouselContainer>
      </TopRankCardStyle.PaperCard>
    </TopRankCardStyle.Container>
  );
};

export default TopRankCard;
