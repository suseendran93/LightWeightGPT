import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEdit } from "@fortawesome/free-solid-svg-icons";

const ChatLogV2 = ({ messageLog, handleSend }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editedTexts, setEditedTexts] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleEdit = (index) => {
    const messageText = messageLog[index].text;
    setEditedTexts((prevState) => ({ ...prevState, [index]: messageText }));
    setEditedIndex(index);
  };

  const handleCopy = (index) => {
    const messageText = messageLog[index].text;
    navigator.clipboard.writeText(messageText);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSend(e);
    }
  };
  const messageElements = messageLog.map((item, index) => {
    const showButtons = hoveredIndex === index;
    const isEdited = editedTexts[index] && editedTexts[index] !== item.text;
    const isBeingEdited = editedIndex === index;
    return (
      <div
        key={index}
        className={`row message ${item.type}`}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {isBeingEdited ? (
          <input
            type="text"
            value={editedTexts[index]}
            onKeyDown={handleKeyPress}
            onChange={(e) =>
              setEditedTexts((prevState) => ({
                ...prevState,
                [index]: e.target.value,
              }))
            }
            onBlur={() => {
              setEditedTexts((prevState) => ({ ...prevState, [index]: "" }));
              setEditedIndex(null);
            }}
          />
        ) : (
          <div className="col-11 message__text">
            {isEdited ? editedTexts[index] : item.text}
          </div>
        )}
        {showButtons && (
          <div className="col-1 message__button">
            {item.type === "message--sent" ? (
              <FontAwesomeIcon
                icon={faEdit}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(index)}
              />
            ) : (
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

export default ChatLogV2;
