import { Dialog } from "@mui/material";
import React, { useState } from "react";
import AlertCardStyle from "../styles/AlertCardStyle";
import ButtonPureStyle from "../styles/ButtonPureStyle";

interface IDetails {
  type:
    | "cancleCreation"
    | "cancleEditing"
    | "cancleDeletion"
    | "logout"
    | "cancleExport";
  open: boolean;
  cancle: (value: boolean) => void;
}

const Types = {
  cancleCreation: {
    header: "Are you sure to discard this creation ?",
    details: "This post will not show on board and your profile",
  },
  cancleEditing: {
    header: "Are you sure to discard this editing?",
    details: "Music you edited is going not to be saved",
  },
  cancleDeletion: {
    header: "Are you sure to delete this post?",
    details: "This post will be deleted permanently",
  },
  logout: {
    header: "Are you sure to logout?",
    details: "",
  },
  cancleExport: {
    header: "Are you sure to cancle the export?",
    details: "The selected musics will be deleted",
  },
};

const AlertCard: React.FC<IDetails> = ({ type, open, cancle }) => {
  const handleClose = (btnName: string) => {
    if (btnName === "yes") {
      cancle(true);
      // setOpenAlert(false);
      return;
    }
    cancle(false);
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { backgroundColor: "transparent", borderRadius: "20px" },
      }}
    >
      <AlertCardStyle.AlertPaper>
        <AlertCardStyle.DetailsContainer>
          <AlertCardStyle.AlertHeader>
            {Types[type].header}
          </AlertCardStyle.AlertHeader>
          <AlertCardStyle.AlertDetails>
            {Types[type].details}
          </AlertCardStyle.AlertDetails>
        </AlertCardStyle.DetailsContainer>
        <AlertCardStyle.ButtonContainer>
          <ButtonPureStyle.ButtonPureColour onClick={() => handleClose("no")}>
            No
          </ButtonPureStyle.ButtonPureColour>
          <ButtonPureStyle.ButtonPureTransparent
            onClick={() => handleClose("yes")}
          >
            Yes
          </ButtonPureStyle.ButtonPureTransparent>
        </AlertCardStyle.ButtonContainer>
      </AlertCardStyle.AlertPaper>
    </Dialog>
  );
};

export default AlertCard;
