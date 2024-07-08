import logo from "./logo.svg";
import { Client } from "@stomp/stompjs";
import SocketJs from "sockjs-client/dist/sockjs";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessages] = useState(["Default Message"]);

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: new SocketJs("http://localhost:7080/websocket"),
      onConnect: () => {
        console.log("Socket connection....");
        newClient.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the received message to the state
        });
      },
    });
  });

  return (
    <div className="App">
      <h1>App has been connect to socket...</h1>
      <h2>Message:</h2>
      {message?.map((message, index) => (
        <p>message</p>
      ))}
    </div>
  );
}

export default App;
