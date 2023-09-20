"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Peer from "simple-peer"

import { io } from 'socket.io-client'
export default function Home() {

  const [myStream,setMyStream] = useState<MediaStream>();
  const myideoRef = useRef<HTMLVideoElement>(null);
  const socket = useRef<any>();
  const [partnerStream,setPartenerStream] = useState<MediaStream>();
  const partenerVideoRef = useRef<HTMLVideoElement>(null);
  const [users,setUsers]= useState({});
  const[calling,setCalling] = useState(false);
  const [caller,setCaller] = useState<any>();
  const [signaldata,setSignalData] = useState<any>();

  const callUser=(socketId:any)=>{
    const peer = new Peer({
      initiator:true,
      config:{
        iceServers:[
          {
            urls:"stun:stun.1.google.com:19302"
          }
        ]
      },
      trickle:false,
      stream:myStream
    });

    peer.on("signal",data=>{
      socket.current.emit("callerUser",{from:socket.current.id,to:socketId,signal:data});
    });

    

    peer.on("stream",stream=>{
      if(stream && partenerVideoRef.current){
        partenerVideoRef.current.srcObject = stream;
        setPartenerStream(stream);
      }
    });

    socket.current.on("received",(data:any)=>{
      peer.signal(data.signal);
    })

    
  }

  const acceptCall = (data:{from:any,signal:any})=>{
    const peer = new Peer({
      initiator:false,
      config:{
        iceServers:[
          {
            urls:"stun:stun.1.google.com:19302"
          }
        ]
      },
      trickle:false,
      stream:myStream
    });
    peer.on("signal",sd=>{
      socket.current.emit("accept",{from:socket.current.id,to:data.from,signal:sd});
    });

  


    peer.on("stream",stream=>{
      if(stream && partenerVideoRef.current){
        partenerVideoRef.current.srcObject = stream;
        setPartenerStream(stream);
      }
    });

    peer.signal(data.signal);
  }
  useEffect(()=>{

    
      socket.current = io("http://localhost:5000");
    
   
    navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    }).then((stream)=>{
      if(stream && myideoRef.current){
        myideoRef.current.srcObject = stream;
        setMyStream(stream);
      }
    })
    
    socket.current.on("connection",(data: any)=>{
      console.log(data);
    });

    socket.current.on("calling",(data:{from:any,signal:any})=>{
      setCalling(true);
      setCaller(data.from);
      setSignalData(data.signal);
    

    })

    socket.current.on("allusers",(users:any)=>{
      setUsers(users);
    })


  },[])

  return (
   <>
   
   
   <h1>My</h1>
   <video src="" ref={myideoRef} playsInline autoPlay></video>

   <h1>Other</h1>
   <video src="" ref={partenerVideoRef} playsInline autoPlay></video>


   <h1>Users</h1>
   {Object.keys(users).map(key=>{
    return key!==socket.current.id && <div><button onClick={()=>callUser(key)}>{key} call</button> <br /> </div>
   })}

{calling && <button onClick={()=>{
acceptCall({from:caller,signal:signaldata})
}}>Accept</button> }
   
   </>
  )
}
