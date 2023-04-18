import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
const ChatLog = ({ messageLog }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // const handleEdit = (index) => {};
  const handleCopy = (index) => {
    const messageText = messageLog[index].text;
    navigator.clipboard.writeText(messageText);
  };
  const messageElements = messageLog.map((item, index) => {
    const showButtons = hoveredIndex === index;

    return (
      <div
        key={index}
        className={`row message ${item.type}`}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div className="col-11 message__text">
          {item.text.includes("```") ? (
            <SyntaxHighlighter
              language="javascript"
              style={tomorrow}
              className="SyntaxHighlighter"
            >
              {item.text}
            </SyntaxHighlighter>
          ) : (
            item.text
          )}
        </div>
        {showButtons && (
          <div className="col-1 message__button">
            {item.type === "message--sent" ? null : ( // /> //   onClick={() => handleEdit(index)} //   style={{ cursor: "pointer" }} //   icon={faEdit} // <FontAwesomeIcon
              <FontAwesomeIcon
                icon={faCopy}
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy(index)}
              />
            )}
          </div>
        )}
      </div>
    );
  });
  return messageElements;
};

export default ChatLog;
