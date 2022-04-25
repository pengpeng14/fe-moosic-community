import { PostData, Post } from "../interfaces/post/Posts";
import PostsPanelStyle from "../styles/PostsPanelStyle";
import SmallPostCard from "../components/SmallPostCard";

const postsLayout = (posts: PostData[]) => {
  const elements: JSX.Element[] = [];
  let cards_in_row = [];
  let card = null;
  let row = null;
  let i = 0;
  while (i < posts.length) {
    if ((i + 1) % 3 !== 0) {
      card = (
        <PostsPanelStyle.CardContainer>
          <SmallPostCard
            change={true}
            post={posts[i].post}
            playlist={posts[i].playlist}
            music={posts[i].music}
            liked={posts[i].liked}
          />
        </PostsPanelStyle.CardContainer>
      );
      cards_in_row.push(card);
    } else {
      row = (
        <PostsPanelStyle.RowContainer>
          {cards_in_row.map((card) => card)}
          <PostsPanelStyle.CardContainer style={{ marginRight: 0 }}>
            <SmallPostCard
              change={true}
              post={posts[i].post}
              playlist={posts[i].playlist}
              music={posts[i].music}
              liked={posts[i].liked}
            />
          </PostsPanelStyle.CardContainer>
        </PostsPanelStyle.RowContainer>
      );
      elements.push(row);
      cards_in_row = [];
    }
    i += 1;
  }
  if (cards_in_row.length % 3 !== 0) {
    if (cards_in_row.length % 3 === 1) {
      row = (
        <PostsPanelStyle.RowContainer>
          {cards_in_row[cards_in_row.length - 1]}
          <PostsPanelStyle.CardContainer></PostsPanelStyle.CardContainer>
          <PostsPanelStyle.CardContainer
            style={{ marginRight: 0 }}
          ></PostsPanelStyle.CardContainer>
        </PostsPanelStyle.RowContainer>
      );
    } else {
      row = (
        <PostsPanelStyle.RowContainer>
          {cards_in_row[cards_in_row.length - 2]}
          {cards_in_row[cards_in_row.length - 1]}
          <PostsPanelStyle.CardContainer
            style={{ marginRight: 0 }}
          ></PostsPanelStyle.CardContainer>
        </PostsPanelStyle.RowContainer>
      );
    }
    elements.push(row);
  }
  return elements;
};

export default { postsLayout };
