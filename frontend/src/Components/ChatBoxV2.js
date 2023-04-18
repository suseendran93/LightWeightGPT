import React, { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../Context/ApiContext";
import ChatLog from "./ChatLog";
const ChatBoxV2 = () => {
  const [message, setMessage] = useState("");
  const [messageLog, setMessageLog] = useState([]);
  const { apiKey, orgId } = useContext(ApiContext);
  let messages = [];

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSend(e);
    }
  };
  const addMessageText = (text, type) => {
    setMessageLog((prevMessageLog) => [
      ...prevMessageLog,
      { text: text, type: type },
    ]);
  };
  const handleSend = (e) => {
    e.preventDefault();
    const messageText = message;
    const newMessage = {
      role: "user",
      content: `${messageText}`,
    };
    messages.push(newMessage);
    setMessage("");

    addMessageText(messageText, "message--sent");
    //posting the prompt to API
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        apiKey,
        orgId,
      }),
    })
      .then((res) => res.json()) //getting the response from API
      .then((data) => {
        let newAssistantMessage = {
          role: "assistant",
          content: `${data.completion.content}`,
        };

        messages.push(newAssistantMessage);
        setMessage("");
        addMessageText(newAssistantMessage.content, "message--received");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="header-title">GPT</h1>
      </div>
      <div className="row chat-box">
        <form className="chat-input-form">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type a prompt..."
            className="chat-box__input"
            onKeyDown={handleKeyPress}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={handleSend}
            className="chat-box__send-btn"
          />
        </form>
      </div>
      <div className="row chat-log-container">
        <div className="chat-log" id="chat-log">
          <ChatLog messageLog={messageLog} />
          {/* <ChatLogV2 messageLog={messageLog} handleSend={handleSend} /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBoxV2;
