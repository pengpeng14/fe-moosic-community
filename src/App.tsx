// import "./App.css";
import { StyledEngineProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client, Frame, Message, over } from "stompjs";
import EditPostBox from "./components/EditPostBox";
import ExportPostBox from "./components/ExportPostBox";
import ResultCard from "./components/ResultCard";
import { PostData } from "./interfaces/post/Posts";
import Preload from "./pages/Preload";
import {
  addPost,
  deletePost,
  updatePost,
  updateTopPosts,
} from "./reducers/postsSlice";
import sleep from "./utils/sleep";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(true);
  const [openBasic, setOpenBasic] = useState<boolean>(true);
  const [openResult, setOpenResult] = useState(false);
  const [socket, setSocket] = useState<WebSocket>(
    new SockJS("http://localhost:8000/api/v1/moosic-socket")
  );
  const [client, setClient] = useState<Client>(over(socket));

  const handleTopPosts = async (res: Message) => {
    console.log("Top post updated");
    const data = res.body;
    const formatData: PostData[] = JSON.parse(data);
    console.log(formatData);
    dispatch(updateTopPosts(formatData));
  };

  const handleNewPost = async (res: Message) => {
    console.log("New posts update");
    console.log(JSON.parse(res.body));
    const data = res.body;
    const formatData: PostData = JSON.parse(data);
    await sleep(2100);
    dispatch(addPost(formatData));
  };

  const handleUpdatedPost = async (res: Message) => {
    console.log("Updated posts update");
    console.log(JSON.parse(res.body));
    const data = res.body;
    const formatData: PostData = JSON.parse(data);
    dispatch(updatePost(formatData));
  };

  const handleDeletedPost = async (res: Message) => {
    console.log("Deleted posts update");
    console.log(JSON.parse(res.body));
    const data = res.body;
    const formatData = JSON.parse(data);
    // setOpenResult(true);
    // await sleep(2200);
    dispatch(deletePost(formatData.id));
    // setOpenResult(false);
  };

  const errorSocket = async () => {
    console.log("Connet socket error");
  };

  useEffect(() => {
    const connectSocket = async (frame?: Frame) => {
      client.subscribe("/topics/top-posts", handleTopPosts);
      client.subscribe("/topics/new-post", handleNewPost);
      client.subscribe("/topics/updated-post", handleUpdatedPost);
      client.subscribe("/topics/deleted-post", handleDeletedPost);
    };
    const init = async () => {
      client.connect({}, connectSocket, errorSocket);
    };

    init();
  }, []);

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Preload />
        </BrowserRouter>
        <ResultCard />
        <EditPostBox />
        <ExportPostBox />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
