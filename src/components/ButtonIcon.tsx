import React from "react";
import ButtonIconStyle from "../styles/ButtonIconStyle";

interface IDetails {
  btnName: string;
  iconPath: string;
  isReverse?: boolean;
  btnType: string;
}

const ButtonIcon: React.FC<IDetails> = ({
  btnName,
  iconPath,
  isReverse,
  btnType,
}) => {
  return (
    <>
      {btnType === "btnTransparent" ? (
        <ButtonIconStyle.ButtonIconTransparent isReverse={isReverse ?? false}>
          <div>{btnName}</div>
          <div style={{ marginRight: "30px" }}></div>
          <div>{iconPath}</div>
        </ButtonIconStyle.ButtonIconTransparent>
      ) : btnType === "btnColour" ? (
        <ButtonIconStyle.ButtonIconColour isReverse={isReverse ?? false}>
          <div>{btnName}</div>
          <div style={{ marginRight: "30px" }}></div>
          <div>{iconPath}</div>
        </ButtonIconStyle.ButtonIconColour>
      ) : (
        <ButtonIconStyle.Menu>
          <ButtonIconStyle.ButtonIconInGroup
            isReverse={isReverse ?? false}
            style={{
              borderRadius: "10px 10px 0px 0px",
              borderBottomWidth: "0px",
            }}
          >
            <div>{btnName}</div>
            <div style={{ marginRight: "20px" }}></div>
            <div>{iconPath}</div>
          </ButtonIconStyle.ButtonIconInGroup>
          <ButtonIconStyle.ButtonIconInGroup
            isReverse={isReverse ?? false}
            style={{ borderRadius: "0px" }}
          >
            <div>{btnName}</div>
            <div style={{ marginRight: "20px" }}></div>
            <div>{iconPath}</div>
          </ButtonIconStyle.ButtonIconInGroup>
          <ButtonIconStyle.ButtonIconInGroup
            isReverse={isReverse ?? false}
            style={{ borderRadius: "0px 0px 10px 10px", borderTopWidth: "0px" }}
          >
            <div>{btnName}</div>
            <div style={{ marginRight: "20px" }}></div>
            <div>{iconPath}</div>
          </ButtonIconStyle.ButtonIconInGroup>
        </ButtonIconStyle.Menu>
      )}
    </>
  );
};

export default ButtonIcon;
