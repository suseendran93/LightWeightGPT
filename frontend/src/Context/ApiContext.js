import React, { createContext, useState } from "react";

// Create the context
export const ApiContext = createContext();

// Create the provider component
export const ApiProvider = ({ children }) => {
  // Define state for apiKey and orgId
  const [apiKey, setApiKey] = useState("");
  const [orgId, setOrgId] = useState("");

  // Define functions to update apiKey and orgId
  const updateApiKey = (newApiKey) => setApiKey(newApiKey);
  const updateOrgId = (newOrgId) => setOrgId(newOrgId);

  // Define the value of the context
  const contextValue = {
    apiKey,
    orgId,
    updateApiKey,
    updateOrgId,
  };

  // Return the provider with the context value
  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
