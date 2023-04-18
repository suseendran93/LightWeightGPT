import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatBoxV2 from "./Components/ChatBoxV2";
import AuthenticationPage from "./Components/AuthenticationPage";
import PrivateRoute from "./Routes/PrivateRoute";
import { ApiProvider } from "./Context/ApiContext";
const App = () => {
  return (
    <div className="App">
      <ApiProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AuthenticationPage />} />
            <Route
              path="/home"
              element={<PrivateRoute Component={ChatBoxV2} />} //PrivateRoute is an HOC
            />
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </div>
  );
};

export default App;
