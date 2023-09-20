
import CreateMode from '@/components/CreateMode';
import RoomJoin from '@/components/RoomJoin';
import React from 'react'



type Props = {
    params: {
        room:string
    },
    searchParams: { [key: string]: string | string[] | undefined },
  }

export default function page(props:Props) {

    const searchParams = props.searchParams;

    const {mode} = searchParams;
   

    if(mode==="join"){

return        <>
        <RoomJoin roomId={props.params.room}/>
        </>

    }else{
        console.log("create")
        return <>
        <CreateMode roomId={props.params.room} />
        </>
    }

}
