import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicState {
  playingURL: string;
  isPlaying: boolean;
  isSelected: boolean;
  playlistIndex: number;
  musicIndex: number;
  postId: string;
  musicId: string;
  playlistId: string;
  selectedId: string;
  playingId: string;
}

interface MusicSelected {
  playlistIndex: number;
  musicIndex: number;
  id: string;
  playlistId?: string;
  musicId?: string;
}

interface MusicPlayPause {
  previewURL: string;
  id: string;
}

const initialState: MusicState = {
  playingURL: "",
  isPlaying: false,
  isSelected: false,
  playlistIndex: 5,
  musicIndex: 5,
  postId: "",
  musicId: "",
  playlistId: "",
  selectedId: "",
  playingId: "",
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    playpauseInCreate: (state: MusicState, id: PayloadAction<string>) => {
      if (state.playingId === id.payload) {
        // const updated = { ...state, playingURL: "", isPlaying: false };
        const updated = { ...state, playingId: "", isPlaying: false };
        return { ...state, ...updated };
      }
      // const updated = { ...state, playingURL: url.payload, isPlaying: true };
      const updated = { ...state, playingId: id.payload, isPlaying: true };
      return { ...state, ...updated };
    },
    select: (state: MusicState, data: PayloadAction<MusicSelected>) => {
      const value = data.payload;
      if (state.selectedId === value.id) {
        console.log("select the same one before");
        const updated = {
          ...state,
          selectedId: "",
          isSelected: false,
          playlistIndex: 5,
          musicIndex: 5,
        };

        return { ...state, ...updated };
      }
      console.log("value: ", value.id);
      const updated = {
        ...state,
        selectedId: value.id,
        isSelected: true,
        playlistIndex: value.playlistIndex,
        musicIndex: value.musicIndex,
        playlistId: value.playlistId ? value.playlistId : "",
        musicId: value.musicId ? value.musicId : "",
      };
      return { ...state, ...updated };
    },
    clear: (state: MusicState) => {
      const cleared = { ...state, ...initialState };

      return { ...state, ...initialState };
    },
    playpauseInFeed: (
      state: MusicState,
      data: PayloadAction<MusicPlayPause>
    ) => {
      console.log("play pause in feed");
      console.log(data.payload.previewURL);
      if (state.postId === data.payload.id) {
        const updated = { ...state, postId: "", isPlaying: false, musicId: "" };
        return { ...state, ...updated };
      }
      const updated = {
        ...state,
        postId: data.payload.id,
        isPlaying: true,
        playingURL: data.payload.previewURL,
        musicId: data.payload.id,
      };
      return { ...state, ...updated };
    },
    defaultSelected: (state: MusicState, data: PayloadAction<string>) => {
      const setDefault = {
        ...state,
        selectedId: data.payload,
        isSelected: true,
      };
      return { ...state, ...setDefault };
    },
  },
});

export const {
  playpauseInCreate,
  select,
  clear,
  playpauseInFeed,
  defaultSelected,
} = musicSlice.actions;

export const selectMusic = (state: RootState) => {
  return state.music;
};

export default musicSlice.reducer;
