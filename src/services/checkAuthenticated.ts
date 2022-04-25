// import Cookies from "universal-cookie";
import Cookies from "js-cookie";

const checkAuthenticated = () => {
  //   const cookie = document.cookie;
  //   console.log("cookie:", cookie);
  //   const decode = decodeURIComponent(cookie);
  //   console.log("decode:", decode);
  //   const cookies = new Cookies();
  const token = Cookies.get("access_token");
  console.log(token);
  //   const access_token = Cookies.get("access_token");

  return null;
};

export default checkAuthenticated;
