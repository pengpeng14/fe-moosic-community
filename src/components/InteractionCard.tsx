import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IInteactionCard } from "../interfaces/ISmallPostCard";
import {} from "../reducers/favouritePostsSlice";
import { updateLikePost } from "../reducers/postsSlice";
import { selectVisitedProfile } from "../reducers/profileSlice";
import { selectUser } from "../reducers/userSlice";
import {
  addFavouritePost,
  removeFavouritePost,
  selectViewPosts,
  updateViewFavoriteLike,
  updateViewPostLike,
} from "../reducers/viewPostsSlice";
import InteractionCardStyle from "../styles/InteractionCardStyle";
import { Post } from "./../interfaces/post/Posts";
import { selectPosts } from "./../reducers/postsSlice";
import { toggleLike } from "./../services/post";

// data from small-post-card component
// data set: like_count, user data
// we do like and unlike action here

const InteractionCard: React.FC<IInteactionCard> = ({
  change,
  post,
  isLiked,
}) => {
  // isLike is based on post data and user acc
  const profile = useSelector(selectVisitedProfile);
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [time, setTime] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const viewPosts = useSelector(selectViewPosts);
  const location = useLocation();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    setLike(isLiked);
    setLikeCount(post.likeCount);
  }, [post.likeCount, isLiked]);

  useEffect(() => {}, [posts]);

  const gotoProfile = (post: Post) => {
    navigate(`/profile/${post.user.username}?type=posts`, { replace: true });
  };

  const handleLike = async (post: Post) => {
    if (location.pathname.includes("/ranked")) return;

    const oldLike = like;
    setLike(!oldLike);
    setLikeCount(oldLike ? likeCount - 1 : likeCount + 1);
    if (time !== undefined) {
      clearTimeout(time);
    }

    setTime(
      setTimeout(async () => {
        if (like !== undefined && isLiked === oldLike) {
          await toggleLike(post.id, like)
            .then((data) => {
              dispatch(updateLikePost(post.id));
              setTime(undefined);
              if (change) {
                if (!like) {
                  dispatch(updateViewPostLike(post.id));
                  if (profile.user.id === currentUser.id) {
                    dispatch(
                      addFavouritePost(
                        viewPosts.posts.filter((p) => p.post.id === post.id)[0]
                      )
                    );
                  }
                  dispatch(updateViewFavoriteLike(post.id));
                } else {
                  dispatch(removeFavouritePost(post.id));
                  dispatch(updateViewPostLike(post.id));
                }
              }
            })
            .catch((e) => {
              console.error(e);
              console.log("Error");
              setLikeCount(likeCount - 1);
              setLike(!like);
            });
          // setLikeCount(response.post.likeCount);
        }
      }, 1000)
    );
  };

  return (
    <>
      <InteractionCardStyle.BottomPaper change={change ?? false}>
        <InteractionCardStyle.FavContainer>
          <InteractionCardStyle.FavBtn onClick={() => handleLike(post)}>
            <InteractionCardStyle.FavIcon
              src={`/assets/icons/${like ? "liked" : "unlike"}.png`}
              id={`like-button-${post.id}`}
            />
          </InteractionCardStyle.FavBtn>
          <InteractionCardStyle.NLikes>{likeCount}</InteractionCardStyle.NLikes>
        </InteractionCardStyle.FavContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <InteractionCardStyle.Username
            change={change}
            onClick={() => (!post.user ? null : gotoProfile(post))}
          >
            {post.user ? post.user.username : profile.user.username}
          </InteractionCardStyle.Username>
          <InteractionCardStyle.Date change={change}>
            {moment(post.createdAt).fromNow()}
          </InteractionCardStyle.Date>
        </div>
      </InteractionCardStyle.BottomPaper>
    </>
  );
};

export default InteractionCard;
