import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './reducers/connectionReducer'




export const createRtcMiddleware =
  () => (store:any) => (next:any) => async (action:any) => {
    switch (action.type) {
    //   case "RTC_CONNECTION_CREATE": {
    //     const { rtcConfig } = action;
    //     rtcPeerConnection = new RTCPeerConnection(rtcConfig);
    //     console.log(store.getState().PeerConnection.remoteStream);
    //     rtcPeerConnection.addEventListener("icecandidate", async (event) => {
    //       console.log("Yes ice candidate required");
    //       if (event.candidate) {
    //         sendIceCandidate(event.candidate);
    //       }
          
    //     });


    //    if(store
    //     .getState()
    //     .PeerConnection.myStream!=null){
    //     rtcPeerConnection.addEventListener("track", (event) => {
    //       const stream = event.streams[0];
    //       store.dispatch(setRemoteStream(stream));
    //     });
    //    }


    //     console.log("Evenet called", rtcPeerConnection);

    //     return;
    //   }

    //   case "RECONNECT": {
    //     if (rtcPeerConnection) {
    //       rtcPeerConnection.close();
    //     }
    //     const { rtcConfig } = action;
    //     rtcPeerConnection = new RTCPeerConnection(rtcConfig);
    //     // handleOnUserJoin("Ramesh");
    //     //    console.log(store.getState().PeerConnection.remoteStream);
    //     rtcPeerConnection.addEventListener("icecandidate", async (event) => {
    //       console.log("Yes ice candidate required");

    //       if (event.candidate) {
    //         sendIceCandidate(event.candidate);
    //       }
    //     });
    //     rtcPeerConnection.addEventListener("track", (event) => {
    //       const stream = event.streams[0];

    //       store.dispatch(setRemoteStream(stream));
    //     });

    //     console.log("Evenet called", rtcPeerConnection);

    //     return;
    //   }

    //   case "RTC_CONNECTION_SET_DESCRIPTION": {
    //     // const { callback } = action;
    //     if (rtcPeerConnection) {
    //     if( store
    //         .getState()
    //         .PeerConnection.myStream!=null){
    //         store
    //         .getState()
    //         .PeerConnection.myStream.getTracks()
    //         .forEach((track) => {
    //           rtcPeerConnection.addTrack(
    //             track,
    //             store.getState().PeerConnection.myStream
    //           );
    //         });
    //     }
    //       sendChannel = await rtcPeerConnection.createDataChannel(
    //         "SendMessage"
    //       );
    //       console.log("sendchannel created", sendChannel);

    //       const offer = await rtcPeerConnection.createOffer();

    //       await rtcPeerConnection.setLocalDescription(
    //         new RTCSessionDescription(offer)
    //       );
    //       //   sendChannel.onmessage=(data)=>{
    //       //     console.log("Coming from channel data",data);
    //       //   }
    //       sendChannel.addEventListener("open", () => {
    //         console.log("Data channel opened");
    //       });

    //       sendChannel.addEventListener("message", (event) => {
    //         console.log("Received message:", event.data);
    //         store.dispatch(
    //             setMessageList({
    //               name: "Stranger",
    //               message: event.data,
    //               me: false,
    //             })
    //           );
            
    //       });

    //       sendChannel.addEventListener("close", () => {
    //         console.log("Data channel closed");
    //       });

    //       sendChannel.addEventListener("error", (error) => {
    //         console.error("Data channel error:", error);
    //       });
    //       console.log("offer created", offer);
    //       sendOffer(offer);
    //     }

    //     return;
    //   }

    //   case "CREATE_ANS": {
    //     // const { callback } = action;
    //     if (rtcPeerConnection) {
    //      if(store
    //       .getState()
    //       .PeerConnection.myStream!=null){
    //       store
    //       .getState()
    //       .PeerConnection.myStream.getTracks()
    //       .forEach((track) => {
    //         rtcPeerConnection.addTrack(
    //           track,
    //           store.getState().PeerConnection.myStream
    //         );
    //       });
    //      }
    //       console.log("gettingOffer", action.offer);
    //       rtcPeerConnection.addEventListener("datachannel", (event) => {
    //         sendChannel = event.channel;

    //         // Event listeners for data channel
    //         sendChannel.addEventListener("open", () => {
    //           console.log("Data channel opened");
    //         });

    //         sendChannel.addEventListener("message", (event) => {
    //           console.log("Received message:", event.data);
    //           store.dispatch(
    //             setMessageList({
    //               name: "Stranger",
    //               message: event.data,
    //               me: false,
    //             })
    //           );
    //         });

    //         sendChannel.addEventListener("close", () => {
    //           console.log("Data channel closed");
    //         });

    //         sendChannel.addEventListener("error", (error) => {
    //           console.error("Data channel error:", error);
    //         });
    //       });

    //       await rtcPeerConnection.setRemoteDescription(action.offer);
    //       const ans = await rtcPeerConnection.createAnswer();
    //       await rtcPeerConnection.setLocalDescription(
    //         new RTCSessionDescription(ans)
    //       );
    //       console.log("answer created", ans);

    //       rtcPeerConnection.ondatachannel = (event) => {
    //         console.log("event", event);
    //       };
    //       sendAns(ans);
    //     }

    //     return;
    //   }

    //   case "SET_REMOTEDESCRIPTION": {
    //     // const { callback } = action;
    //     if (rtcPeerConnection) {
    //       console.log("getting answer", action.ans);
    //       await rtcPeerConnection.setRemoteDescription(
    //         new RTCSessionDescription(action.ans)
    //       );

    //       console.log(rtcPeerConnection);
    //     }

    //     return;
    //   }

    //   case "ADD_ICE_CANDIDATE": {
    //     // const { callback } = action;
    //     if (rtcPeerConnection) {
    //       console.log("iceCandidate", action.candidate);
    //       await rtcPeerConnection.addIceCandidate(action.candidate);
    //     }

    //     return;
    //   }

    //   case "SEND_MESSAGE": {
    //     // const { callback } = action;
    //     if (rtcPeerConnection) {
    //       // (sendChannel)
    //       // console.log(sendChannel);
    //       if (sendChannel) {
    //         store.dispatch(
    //             setMessageList({
    //               name: "Me",
    //               message: action.data,
    //               me: true,
    //             })
    //           );
    //         sendChannel.send(action.data);
    //       }
    //     }

    //     return;
    //   }
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
   ConnectionReducer:connectionReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions:true,
      ignoredPaths: [
        "ConnectionReducer.myVideoStream",
        "ConnectionReducer.peers",
        "ConnectionReducer.usersVideoStreams",
      ],
    },
  }).concat(createRtcMiddleware())

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch