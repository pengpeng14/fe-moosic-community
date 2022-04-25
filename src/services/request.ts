import Axios from "axios";

let API_PORT;
let API_PATH;

if (process.env.REACT_APP_ENV === "deploy") {
  API_PATH = `https://moosic-api.herokuapp.com/api/v1`;
} else {
  API_PORT = 8000;
  API_PATH = `http://localhost:${API_PORT}/api/v1`;
  // API_PATH = "http://d9cd-182-232-199-23.ngrok.io/api/v1";
}

const request = Axios.create({
  withCredentials: true,
  baseURL: `${API_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
