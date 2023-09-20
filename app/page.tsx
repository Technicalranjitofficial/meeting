"use client"
import { useAppSelector } from '@/redux/hooks'
import { createRoom, initSocket } from '@/socket'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'



const page = () => {

    const roomId = useAppSelector((state)=>state.ConnectionReducer.room);
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

  
    useEffect(()=>{
        if(roomId.length>0){
            router.replace(`/${roomId}?mode=create`)
        }
    },[roomId])

    const [creating,setCreating] = useState(false);
    useEffect(()=>{
        initSocket();
    },[])



 
  return (
    <div>
     {creating? <h1>Creating</h1> : <button onClick={()=>{
        
        createRoom();
     }}>Create Room</button> }<br />


      <input ref={inputRef} type="text" placeholder='Join room'/>
      <button onClick={()=>{
        if(inputRef.current){
            router.replace(`/${inputRef.current.value}?mode=join`);
        }
      }}>Join Room</button>




    </div>
  )
}

export default page
