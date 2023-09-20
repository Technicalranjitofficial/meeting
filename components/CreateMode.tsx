"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMyVideoStream } from '@/redux/reducers/connectionReducer'
import { store } from '@/redux/store'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

const CreateMode = ({roomId}:{roomId:string}) => {

    const myStream = useAppSelector((state)=>state.ConnectionReducer.myVideoStream);
    const myVidRef = useRef<HTMLVideoElement>(null);

    const userVideo = useAppSelector((state)=>state.ConnectionReducer.usersVideoStreams);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        }).then((stream)=>{
            dispatch(setMyVideoStream(stream));
           if(myVidRef.current){
            myVidRef.current.srcObject = stream;
           }
        })
    },[])
  return (
    <div>
     {<video src='' autoPlay ref = {myVidRef} playsInline></video>}

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
     
    </div>


  )
}

export default CreateMode
