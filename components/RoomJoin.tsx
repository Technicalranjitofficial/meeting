"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMyVideoStream } from '@/redux/reducers/connectionReducer'
import { store } from '@/redux/store'
import { connectionReadyState, initSocket } from '@/socket'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

const RoomJoin = ({roomId}:{roomId:string}) => {

    const myStream = useAppSelector((state)=>state.ConnectionReducer.myVideoStream);
    const userVideo = useAppSelector((state)=>state.ConnectionReducer.usersVideoStreams);
    const myVidRef = useRef<HTMLVideoElement>(null);
    const dispatch = useAppDispatch();
    useEffect(()=>{
      initSocket();
        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        }).then((stream)=>{
            dispatch(setMyVideoStream(stream));
           if(myVidRef.current){
            myVidRef.current.srcObject = stream;
           }

           connectionReadyState(roomId);
           
        })
    },[])
  return (
    <div>
     {/* {<video src='' autoPlay  ref = {myVidRef} playsInline></video>} */}

     {myStream && <ReactPlayer muted playing url={myStream} />}

     <button onClick={()=>{
        console.log(myStream);
     }}>check</button>


{Object.keys(userVideo).map((key)=>{
      return    <ReactPlayer
      key={key}
      url={userVideo[key]}
      playing
      
      width="10%"
      height="10%"
    />
     })}
    </div>


  )
}

export default RoomJoin
