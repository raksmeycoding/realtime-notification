import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:7080/websocket"),
      onConnect: () => {
        console.log("Connected to WebSocket");
        newClient.subscribe("/topic/events", (message) => {
          console.log("Received message: ", message.body);
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    newClient.activate();

    return () => newClient.deactivate();
  }, []);

  return (
    <div className="App">
      <h1>WebSocket Client</h1>
      <h2>Messages:</h2>
      {messages.map((message, index) => (
        <p key={index}>
          Request ID: {message.requestId}, Status: {message.status}, Data:
          {message?.data}
        </p>
      ))}
    </div>
  );
}

export default App;
