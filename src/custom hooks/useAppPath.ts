import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useAppPath = () => {
  const location = useLocation();

  const [path, setPath] = useState(location.pathname);

  const listenToPopstate = () => setPath(location.pathname);

  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
};

export default useAppPath;
