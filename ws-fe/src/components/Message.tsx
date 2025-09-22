import React from 'react'

type varient = "send" | "recived"
interface MessageProps {
    message: string
    varient: varient
}

function Message({message, varient}: MessageProps) {
  return (
    <div className='w-full'>
        <p className=''>{message}</p>
    </div>
  )
}

export default Message