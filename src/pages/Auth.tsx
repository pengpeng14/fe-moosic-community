import { useState } from "react";
import { Route, Routes } from "react-router";
import Genre from "./Genre";
import Login from "./Login";
import Register from "./Register";

const Auth: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/basic-setting"
        element={<Genre open={open} setOpen={setOpen} />}
      />
    </Routes>
  );
};

export default Auth;
