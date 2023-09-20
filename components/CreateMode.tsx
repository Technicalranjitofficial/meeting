"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMyVideoStream } from '@/redux/reducers/connectionReducer'
import { store } from '@/redux/store'
import { createRoom, initSocket } from '@/socket'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

const CreateMode = ({roomIds}:{roomIds:string}) => {

    const myStream = useAppSelector((state)=>state.ConnectionReducer.myVideoStream);
    const myVidRef = useRef<HTMLVideoElement>(null);

    const userVideo = useAppSelector((state)=>state.ConnectionReducer.usersVideoStreams);
    const dispatch = useAppDispatch();
    const roomId = useAppSelector((state)=>state.ConnectionReducer.room);

    useEffect(()=>{

    },[])
    useEffect(()=>{
      initSocket();
        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        }).then((stream)=>{
            dispatch(setMyVideoStream(stream));
            createRoom();
           if(myVidRef.current){
            myVidRef.current.srcObject = stream;
           }
        })
    },[])
  return (
    <div>
     {myStream && <ReactPlayer muted playing url={myStream} />}

     <button onClick={()=>{
        console.log(myStream);
     }}>check</button>

     <h1>UserVide</h1>

     <button onClick={()=>{
        console.log("all stream",userVideo);
     }}>GetAll Stream</button>

     {Object.keys(userVideo).map((key)=>{
      return    <ReactPlayer
      key={key}
      url={userVideo[key]}
      playing
      
      width="10%"
      height="10%"
    />
     })}


     <button onClick={()=>{
      navigator.clipboard.writeText(roomId);
     }}>copy id</button>

     roomId : {roomId}
     
    </div>


  )
}

export default CreateMode
