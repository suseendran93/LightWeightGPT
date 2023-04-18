import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../Context/ApiContext";
const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { updateApiKey, updateOrgId } = useContext(ApiContext);
  const [newApiKey, setNewApiKey] = useState("");
  const [neworgId, setNewOrgId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleApiKeyChange = (event) => {
    setNewApiKey(event.target.value);
  };
  const handleOrgIdChange = (event) => {
    setNewOrgId(event.target.value);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    updateApiKey(newApiKey);
    updateOrgId(neworgId);
    navigate("/home");
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="row chat-box">
          <div className="col d-flex justify-content-center">
            <form className="auth-input-form">
              <input
                type="text"
                value={neworgId}
                onChange={handleOrgIdChange}
                placeholder="Enter your org ID"
                className="auth-box__input"
              />

              <input
                type="password"
                value={newApiKey}
                onChange={handleApiKeyChange}
                placeholder="Enter your API key"
                className="auth-box__input"
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                onClick={handleLogin}
                className="auth-box__send-btn"
              />
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AuthenticationPage;
