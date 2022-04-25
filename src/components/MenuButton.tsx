import React, { useState, useEffect } from "react";
import MenuButtonStyle from "../styles/MenuButtonStyle";
import MenuCard from "./MenuCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExportPostBoxState,
  clearExportPostBox,
} from "./../reducers/exportBoxSlice";
import {
  clearEditPostBox,
  selectEditPostBoxState,
} from "../reducers/editPostBoxSlice";

interface IDetails {
  postId: string;
  url: string;
  change?: boolean;
}

const MenuButton: React.FC<IDetails> = ({ postId, url, change }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const currentExportPostBox = useSelector(selectExportPostBoxState);
  const currentEditPostBox = useSelector(selectEditPostBoxState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("triggered: currentexportpostbox");
    if (
      (!currentExportPostBox.isOpen && currentExportPostBox.toggled) ||
      (!currentEditPostBox.isOpen && currentEditPostBox.toggled)
    ) {
      console.log("triggered: currentexportpostbox2");
      handleCloseMenu();
      dispatch(clearExportPostBox());
      dispatch(clearEditPostBox());
      return;
    }
  }, [currentExportPostBox.isOpen, currentEditPostBox.isOpen]);

  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <div>
      <MenuButtonStyle.MenuButtonStyle
        change={change}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={open ? handleCloseMenu : handleShowMenu}
      >
        <MenuButtonStyle.ContentStyle>...</MenuButtonStyle.ContentStyle>
      </MenuButtonStyle.MenuButtonStyle>
      {anchorEl && (
        <MenuCard
          postId={postId}
          anchorEl={anchorEl}
          open={open}
          handleCloseMenu={handleCloseMenu}
          url={url}
        />
      )}
    </div>
  );
};

export default MenuButton;
