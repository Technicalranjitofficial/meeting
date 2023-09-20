"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMyVideoStream } from '@/redux/reducers/connectionReducer'
import { store } from '@/redux/store'
import { createRoom, initSocket } from '@/socket'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

import Card from './Card'

import {BiMicrophone} from "react-icons/bi"
import {BiMicrophoneOff} from "react-icons/bi"
import {BsCameraVideo} from "react-icons/bs"
import {BsCameraVideoOff} from "react-icons/bs"
import {MdOutlineScreenShare} from "react-icons/md"
const CreateMode = ({roomIds}:{roomIds:string}) => {

    const myStream = useAppSelector((state)=>state.ConnectionReducer.myVideoStream);
    const myVidRef = useRef<HTMLVideoElement>(null);
    const isUserJoined = useAppSelector((state)=>state.ConnectionReducer.isRoomJoined);

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


    const colorNames = [
      "bg-gray-600",
      "bg-red-600",
      "bg-yellow-600",
      "bg-green-600",
      "bg-blue-600",
      "bg-indigo-600",
      "bg-purple-600",
      "bg-pink-600",
    ];
    
    function getRandomColorIndex() {
      // Generate a random index within the range of the colorNames array
      const randomIndex = Math.floor(Math.random() * colorNames.length);
      return randomIndex;
    }

    const p = [1];

    function toggleVideo() {
      const videoTrack = myStream!.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      
    }

  return (
    <div className='w-screen h-screen'>

     {isUserJoined &&  <div className='fixed flex justify-center items-center z-50 bg-slate-700/50 w-full h-full text-2xl'>
        Joining...
      </div>}

    <div className='w-full h-[90%] p-5   bg-slate-800'>
      <div className={`w-full gap-5 p-2  overflow-y-auto  ${Object.keys(userVideo).length==0?"grid-cols-1":Object.keys(userVideo).length==1?"grid-cols-2": Object.keys(userVideo).length<=4?"md:grid-cols-2 sm:grid-cols-1":"lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"}   h-full grid rounded-lg bg-slate-700`}>
      <Card isMe={true} stream={myStream} color={colorNames[getRandomColorIndex()]}/>
       {Object.keys(userVideo).map((key)=>{
        return  <Card isMe={false} stream={userVideo[key]}  color={colorNames[getRandomColorIndex()]}/>
       })}
       {/* <Card/>
       <Card/> */}
      </div>
    </div>

    <div className='w-full h-[10%] flex justify-center gap-5 bg-gray-800'>
      <div className='h-10 flex items-center w-10 justify-center rounded-full bg-red-600'>
        <BiMicrophoneOff  size="25" />
      </div>
      <div className='h-10 flex items-center w-10 justify-center rounded-full bg-red-600'>
        <BsCameraVideoOff onClick={toggleVideo}  size="23" />
      </div>
      <div className='h-10 flex items-center w-10 justify-center rounded-full bg-slate-600'>
        <MdOutlineScreenShare onClick={()=>navigator.clipboard.writeText(`http://localhost:3000/${roomId}?mode=join`)} size="25" />
      </div>
    </div>

 </div>


  )
}

export default CreateMode
