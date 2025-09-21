import React, { useEffect, useRef, useState } from "react";
import IncomingBubble from "./components/IncomingBubble";
import OutgoingMessage from "./components/OutgoingMessage";

function App() {

  const inputRef = useRef<HTMLInputElement | null>()

  // const [input, setInput] = useState<null | string>(null)
  // const [error, setError] = useState<null | string>(null)  
  const [sendMessages, setSendMessages] = useState<null | string>(null)
  const [recivedMessage, setRecivedMessage] = useState<null | string>()
  const [socket, setSocket] = useState()
 
             
  const sendMessage  = () => {
    if (!socket) {
      return;
    }  

    const InputMessage = inputRef.current?.value
    // @ts-ignore
    socket.send(InputMessage)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws)
    ws.onerror = (error) => {
      console.log(error)
    }

    ws.onmessage = (ev) => {
      alert(ev.data)
    }
  }, [])

  return (
    <div className="h-screen w-screen box-border">
      <div className="h-10/12 w-full">
      {sendMessages !== null?<OutgoingMessage OutgoingMessage={sendMessages}/>:""}
      <IncomingBubble IncomingMessage="  hi there i am shrey vats. what are you doing ? I am just enjoying. And i am a 15 y/o develoer who is learning buildng daily to grow it and its own"/>
      </div>
      <div className="h-1/12 w-full flex justify-center items-center">
        <div className="h-10/12 w-10/12 bg-gray-200 rounded-3xl border border-gray-400 flex justify-center items-center">
          <input
            type="text"
            ref={inputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendMessages(e.target.value)}
            value={sendMessages ?? ""}
            className="h-full w-11/12 rounded-l-3xl outline-none border border-gray-400 px-2"
            placeholder="Ask anything"
          />
          <button className="w-1/12 h-full bg-blue-600 text-white rounded-r-3xl" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
