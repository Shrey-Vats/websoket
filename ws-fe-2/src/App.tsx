import { useEffect, useState } from "react";
import "./App.css";

interface message {
  content: string;
  varient: "recived" | "send";
}

function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    try {
      const newSocket = new WebSocket("ws://localhost:8080");

      newSocket.onopen = () => {
        console.log("Connection opened");
        setSocket(newSocket);
      };

      return () => {
        newSocket?.close;
      };
    } catch (error) {
      console.error;
      throw new Error();
    }
  }, []);

  return socket;
}

function App() {
  const socket = useSocket();
  const [messages, setmessages] = useState<message[]>([]);
  const [input, setInput] = useState<string>("");

  const SendMessage = () => {
    socket?.send(input);
  };

  useEffect(() => {
    socket!.onmessage = (message) => {
      console.log("Message :- " + message.data);
      setmessages((m) => [
        ...m,
        {
          content: message.data,
          varient: "recived",
        },
      ]);
    };
  }, []);

  if (!socket) {
    return (
      <div className="h-ful w-full">
        <h1>Loading..........</h1>
      </div>
    );
  }
  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li 
            style={
              message.varient === "recived"
                ? { color: "red", textAlignLast: "end" }
                : { color: "black" }
            }
          >
            {message.content}
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="enter your messages"
      />
      <button onClick={SendMessage}>Sumbit</button>
    </div>
  );
}

export default App;
