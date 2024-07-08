import logo from "./logo.svg";
import { Client } from "@stomp/stompjs";
import SocketJs from "sockjs-client/dist/sockjs";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
   const newClient = new Client({
    webSocketFactory: new SocketJs("")
   })

  return (
    <div className="App">
      <h1>App has been connect to socket...</h1>
    </div>
  );
}

export default App;
