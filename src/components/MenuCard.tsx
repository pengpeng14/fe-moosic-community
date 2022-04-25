import { Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostEditData } from "../interfaces/post/Posts";
import {
  openEditPostBox,
  setEditPostBoxData,
} from "../reducers/editPostBoxSlice";
import {
  openExportPostBox,
  setExportPostBoxData,
} from "../reducers/exportBoxSlice";
import { clear, defaultSelected } from "../reducers/musicSlice";
import { selectPosts } from "../reducers/postsSlice";
import { openResultCard } from "../reducers/resultCardSlice";
import MenuCardStyle from "../styles/MenuCardStyle";
import postUtils from "../utils/postUtils";
import post from "./../services/post";
import "./../styles/MenuCardCSS.css";
import AlertCard from "./AlertCard";
interface IDetails {
  postId: string;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleCloseMenu: () => void;
  url: string;
}

const MenuCard: React.FC<IDetails> = ({
  postId,
  anchorEl,
  open,
  handleCloseMenu,
  url,
}) => {
  const [img, setImg] = useState<string>("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [postData, setPostData] = useState<PostEditData>();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState<string>("Loading...");

  const handleDelete = async (isCancle: boolean) => {
    if (!isCancle) {
      setOpenAlert(false);
      return;
    }
    setOpenAlert(false);
    const response = await post.deletePost(postId);
    dispatch(openResultCard("deleted"));
  };

  console.log("Menu card");

  const handleEdit = async () => {
    setMessage("Loading...");
    dispatch(clear());
    // setOpenEdit(true);
    const data = postUtils.findPost(posts, postId);

    if (data) {
      dispatch(defaultSelected(data.music.id));
      dispatch(
        openEditPostBox({
          img: data.post.img,
          message,
        })
      );
    }
    const response = await post.getPost(postId).catch((error) => {
      if (error.response.data.message.includes("UUID")) {
        setMessage("Not found");
      } else {
        setMessage("Server error");
      }
    });
    if (response !== undefined) {
      setPostData(response);
      dispatch(
        setEditPostBoxData({
          isOpen: true,
          postData: response,
          url,
          img: data.post.img,
          message,
          toggled: true,
        })
      );
    }
    // handleCloseMenu();
  };

  const handleExport = async () => {
    setMessage("Loading...");
    console.log("Export");
    dispatch(clear());
    // setOpenExport(true);
    const postData = postUtils.findPost(posts, postId);

    if (postData) {
      console.log("Menucard: ", postData);
      dispatch(defaultSelected(postData.music.id));
      dispatch(openExportPostBox({ img: postData.post.img, message }));
    }

    const response = await post.getPost(postId);
    setPostData(response);
    dispatch(setExportPostBoxData({ postData: response, url, isOpen: true }));
    // handleCloseMenu();
  };

  return (
    <>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        style={{
          paddingBottom: 0,
          paddingTop: 0,
        }}
        PaperProps={{
          style: {
            background: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
            width: "fit-content",
            borderRadius: "10px",
            backdropFilter: "blur(100px)",
            height: "fit-content",
          },
        }}
      >
        <MenuItem
          className="MuiButtonBase-root-MuiMenuItem-root"
          style={{ padding: 0 }}
        >
          <MenuCardStyle.ListItemStyle color="black" onClick={handleEdit}>
            <MenuCardStyle.IconBtnStyle src="/assets/icons/edit.png" />
            <MenuCardStyle.Text>Edit</MenuCardStyle.Text>
          </MenuCardStyle.ListItemStyle>
        </MenuItem>
        <Divider />
        <MenuItem
          className="MuiButtonBase-root-MuiMenuItem-root"
          style={{ padding: 0 }}
        >
          <MenuCardStyle.ListItemStyle color="black" onClick={handleExport}>
            <MenuCardStyle.IconBtnStyle src="/assets/icons/export.png" />
            <MenuCardStyle.Text>Export to Spotify</MenuCardStyle.Text>
          </MenuCardStyle.ListItemStyle>
        </MenuItem>
        <Divider />
        <MenuItem
          className="MuiButtonBase-root-MuiMenuItem-root"
          style={{ padding: 0 }}
        >
          <MenuCardStyle.ListItemStyle
            color="red"
            onClick={() => setOpenAlert(true)}
          >
            <MenuCardStyle.IconBtnStyle
              src="/assets/icons/deleted.png"
              isDelete={true}
            />
            <MenuCardStyle.Text>Delete</MenuCardStyle.Text>
          </MenuCardStyle.ListItemStyle>
        </MenuItem>
      </Menu>
      {openAlert && (
        <AlertCard
          type="cancleDeletion"
          open={openAlert}
          cancle={handleDelete}
        />
      )}
    </>
  );
};

export default MenuCard;
