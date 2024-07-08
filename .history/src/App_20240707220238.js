import logo from "./logo.svg";
import { Client } from "@stomp/stompjs";
import SocketJs from "sockjs-client/dist/sockjs";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
   const newClient = new Client({
    webSocketFactory: new SocketJs("http://localhost:7080/websocket"),
    onConnect: () => {
      newClient.subscribe('/topic/public', message => {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]); // Add the received message to the state
      });
    }
   })

  return (
    <div className="App">
      <h1>App has been connect to socket...</h1>
    </div>
  );
}

export default App;
