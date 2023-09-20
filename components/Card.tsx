import React from 'react'
import ReactPlayer from 'react-player';

const Card = ({color,stream,isMe}:{color:string,stream:any,isMe:boolean}) => {
    console.log(color);
    const colors = `bg-${color}-400`;
  return (
    <div className={`w-full min-h-[35vh] rounded-md flex items-center relative justify-center h-full bg-gray-900`}>
        {stream ? <ReactPlayer muted={isMe} playsinline style={{
          transform: 'scaleX(-1)', // Flip horizontally
        }}  width="100%"
      height="100%"  playing url={stream} / >:  <div className={`w-40 text-3xl h-40 ${color}  rounded-[100%] flex justify-center items-center`}>
        R
      </div> }
     
      <h1 className='absolute bottom-3 left-4 '>Ranjit Das</h1>
    </div>
  )
}

export default Card
