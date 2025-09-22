import { useEffect, useState } from "react";

interface message {
  message: string;
  varient: "send" | "recived";
}

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const connectToWebsocket = () => {
      const newSocket = new WebSocket("ws://localhost:8080");

      //connection open
      newSocket.onopen = () => {
        console.log("Connection established");
        newSocket.send("Hello Server!");
      };

      // message recived
      newSocket.onmessage = (event) => {
        console.log("From server:", event.data);

        setMessages((messages) => [
          ...messages,
          {
            message: event.data.toString(),
            varient: "recived",
          },
        ]);

      };

      //connection error
      newSocket.onerror = (error) => {
        console.error("WebSocket error: ", error);
      }

      newSocket.onclose = (close) => {
        console.log("Server close, :", close.code, close.reason)
      }

      setSocket(newSocket);
    };
    connectToWebsocket()
  }, []);

  const onSumbit = () => {
    setMessages((messages) => [
      ...messages,
      {
        message: input!,
        varient: "send",
      },
    ]);
    console.log(messages);

    socket?.send(input!);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-950 text-white">
      <div className="w-6/12 h-9/12 border border-gray-300 rounded-2xl px-5">
        <div className="w-full h-9/12 border border-gray-400 rounded-md">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${
                message.varient === "send" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`font-medium text-base px-4 py-2 ${
                  message.varient === "send"
                    ? "bg-white text-black"
                    : "bg-gray-600 text-white"
                }`}
              >
                {message.message}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full h-3/12">
          <input
            type="text"
            value={input!}
            onChange={(e) => setInput(e.target.value)}
            className="w-9/12 h-full border-gray-400 rounded-xl outline-none"
          />
          <button
            onClick={onSumbit}
            className="w-3/12 h-full bg-gray-200 text-black rounded-md hover:bg-gray-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
