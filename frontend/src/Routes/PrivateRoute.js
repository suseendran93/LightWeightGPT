import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ApiContext } from "../Context/ApiContext";
const PrivateRoute = ({ Component }) => {
  const { apiKey } = useContext(ApiContext);
  const isAuthenticated = apiKey;
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
