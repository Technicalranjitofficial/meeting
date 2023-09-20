import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer"; // Import immer

interface InitialState {
  mySocketId: string;
  myVideoStream: MediaStream | null;
  peers: Record<string, any>;
  room: string;
  isRoomJoined:boolean,
  usersVideoStreams: Record<string, MediaStream>;
}

const initialState: InitialState = {
  mySocketId: "",
  myVideoStream: null,
  peers: {},
  room: "",
  isRoomJoined:false,
  
  usersVideoStreams: {},

};

const connectionSlice = createSlice({
  name: "ConnectionSlice",
  initialState,
  reducers: {
    setMySocketId: (state, action: PayloadAction<string>) => {
      state.mySocketId = action.payload;
    },
    setRoom:(state,action)=>{
        state.room = action.payload;
    },


    setPeerConnection: (state, action: PayloadAction<{ socketId: string, peer: any }>) => {
      const { socketId, peer } = action.payload;

      state.peers = { ...state.peers, [socketId]: peer };
    },

    setMyVideoStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.myVideoStream = action.payload;
    },

    setUserVideoStream: (state, action: PayloadAction<{ stream: MediaStream, socketId: string }>) => {
      state.usersVideoStreams = produce(state.usersVideoStreams, (draft) => {
        draft[action.payload.socketId] = action.payload.stream;
      });
    },
    deleteUserVideoStream:(state,action)=>{
      const socketId = action.payload;
    const d = state.usersVideoStreams;
    delete d[socketId];
    state.usersVideoStreams = d;
    
    const peer = state.peers;
    delete peer[socketId];
    state.peers = peer;
    },
    setIsUserJoined:(state,action)=>{
      state.isRoomJoined = action.payload;
    }
  },
});

export const { setMySocketId, setPeerConnection, setMyVideoStream, setUserVideoStream ,setRoom,deleteUserVideoStream,setIsUserJoined} = connectionSlice.actions;

export default connectionSlice.reducer;
