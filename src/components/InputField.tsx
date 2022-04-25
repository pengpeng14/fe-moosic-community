import { Typography } from "@mui/material";
import React from "react";
import InputFieldStyle from "../styles/InputFieldStyle";

interface IInput {
  label: string;
}

const InputField: React.FC<IInput> = ({ label }) => {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Typography>{label}</Typography>
      <InputFieldStyle />
    </div>
  );
};

export default InputField;
