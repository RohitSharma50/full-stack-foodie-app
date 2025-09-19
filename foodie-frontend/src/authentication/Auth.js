import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import { useSelector } from "react-redux";

export const Auth = () => {
  const [authMode, setAuthMode] = useState("login");
  return (
    <section>
      {authMode === "login" ? (
        <Login setAuthMode={setAuthMode} authMode={authMode} />
      ) : (
        <Signup setAuthMode={setAuthMode} authMode={authMode} />
      )}
    </section>
  );
};
