import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ChatWrapper from "./components/chatWrapper/chatWrapper";
import "./styles/globals.scss";
import "./styles/reset.scss";
import { ChatContextWrapper } from "./context/chatContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChatContextWrapper>
      <ChatWrapper />
    </ChatContextWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
