import { deleteUserVideoStream, setPeerConnection, setRoom, setUserVideoStream } from "@/redux/reducers/connectionReducer";
import { store } from "@/redux/store";
import {io} from "socket.io-client";


import Peer  from "simple-peer";
const peers = <any>{};

let socket:any;
export const initSocket=()=>{
   socket= io("https://kiitmeeting-cb89cf080f3e.herokuapp.com/");
    // return socket;

    socket.on("connection",(data:any)=>{
        console.log(data);


    })

    socket.on("onRoomCreated",(data:{creator:string,roomId:string})=>{
        console.log(data);
        store.dispatch(setRoom(data.roomId));
    });


    // socket.on("connectionRequested",(data:{from:string})=>{
    //     console.log(data);

    //     createConnection(data.from);

    // })

    socket.on("received",(data:any)=>{
        console.log(data);
        peers[data.from].signal(data.signal);

        console.log(peers[data.from]);
    })

    socket.on("finalConnection",(data:any)=>{
      console.log(data);
      peers[data.from].signal(data.signal);
    })

    socket.on("allUsers",(data:{userId:string}[])=>{

      console.log(data);
      data.map((user)=>{

        peers[user.userId] = new Peer({
          initiator:true,
          config:{
            iceServers:[
              { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
            ]
          },
          trickle:false,
          stream:store.getState().ConnectionReducer.myVideoStream!
        });
        peers[user.userId].on("signal",(sd:any)=>{
          socket.emit("offerToAllUser",{from:socket.id,to:user.userId,signal:sd});
        });
    
        peers[user.userId].on("stream",(stream:any)=>{
          store.dispatch(setUserVideoStream({stream:stream,socketId:user.userId}));

        });
    
       

      })
    })



    
    socket.on("incomingCall",(data:any)=>{
      console.log(data);
      createConnection(data.from,data.signal);
    })


// socket.on("calling",(data:any)=>{
   
    
  
socket.on("userLeave",(data:any)=>{

  console.log(data);
  peers[data].destroy();

  store.dispatch(deleteUserVideoStream(data));
})
// }

  }



const createConnection = (senderSocketId:string,signal:any)=>{

  
  
        peers[senderSocketId] = new Peer({
          initiator:false,
          config:{
            iceServers:[
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' },
              { urls: 'stun:stun3.l.google.com:19302' },
              { urls: 'stun:stun4.l.google.com:19302' },
            ]
          },
          trickle:false,
          stream:store.getState().ConnectionReducer.myVideoStream!
        });

        
    
        peers[senderSocketId].on("signal",(data:any)=>{
          socket.emit("receivedIncomingCall",{from:socket.id,to:senderSocketId,signal:data});
        });
    
        

    
        peers[senderSocketId].on("stream",(stream:any)=>{
          store.dispatch(setUserVideoStream({stream:stream,socketId:senderSocketId}))
        });
    
        peers[senderSocketId].signal(signal);
        // socket.on("received",(data:any)=>{
        //     peers[senderSocketId].signal(data.signal);
        // })

        // store.dispatch(setPeerConnection({socketId:senderSocketId,peer: peers[senderSocketId]}))
    
        
      

   
}

export const createRoom = ()=>{
    socket.emit("createRoom",{creator:socket.id});

}

export const connectionReadyState = (roomId:string)=>{

    socket.emit("connectionReady",{from:socket.id,roomId:roomId});
}

