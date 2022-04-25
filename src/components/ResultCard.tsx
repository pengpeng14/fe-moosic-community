import { Dialog, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import ResultCardStyle from "../styles/ResultCardStyle";
import "./../styles/ResultCardCSS.css";
import { useSelector } from "react-redux";
import { closeResultCard, selectResultCard } from "../reducers/resultCardSlice";
import { useDispatch } from "react-redux";

interface ITypes {
  type?: "created" | "saved" | "deleted" | "exported";
  open?: boolean;
}

const Types = {
  created: {
    message: "Post created successfully",
    icon: "/assets/icons/created.png",
  },
  deleted: {
    message: "Post deleted successfully",
    icon: "/assets/icons/deleted.png",
  },
  saved: {
    message: "Post saved successfully",
    icon: "/assets/icons/saved.png",
  },
  exported: {
    message: "Export to Spotify successfully",
    icon: "/assets/icons/saved.png",
  },
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

const ResultCard: React.FC<ITypes> = ({ type, open }) => {
  // const [openResult, setOpenResult] = useState(false);
  const dispatch = useDispatch();
  const resultCard = useSelector(selectResultCard);

  useEffect(() => {
    // if (!open) {
    //   return;
    // }
    // setOpenResult(true);
    console.log("set to open result");
    setTimeout(() => dispatch(closeResultCard()), 2000);
  }, [resultCard.isOpen]);

  return (
    <div>
      <Dialog
        open={resultCard.isOpen}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            zIndex: 3,
            position: "absolute",
          },
        }}
        className={"MuiDialog-Container"}
        id="result-card"
        TransitionComponent={Transition}
        onClose={() => dispatch(closeResultCard())}
      >
        <ResultCardStyle.PaperCard>
          <ResultCardStyle.ImgIcon src={Types[resultCard.type].icon} />
          <ResultCardStyle.Message id="result-message">
            {Types[resultCard.type].message}
          </ResultCardStyle.Message>
        </ResultCardStyle.PaperCard>
      </Dialog>
    </div>
  );
};

export default ResultCard;
