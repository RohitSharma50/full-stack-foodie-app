import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";

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
