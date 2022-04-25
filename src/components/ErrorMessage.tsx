import React from "react";
import ErrorMessageStyle from "../styles/ErrorMessageStyle";

interface IError {
  errorMessage: string;
}

const ErrorMessage: React.FC<IError> = ({ errorMessage }) => {
  return (
    <div>
      <ErrorMessageStyle>{errorMessage}</ErrorMessageStyle>
    </div>
  );
};

export default ErrorMessage;
