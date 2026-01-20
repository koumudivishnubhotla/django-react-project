import React from "react";
import Signup from "./Signup";
import Login from "./Login";

function Auth() {
  return (
    <div style={{ padding: "40px" }}>
      <Signup />
      <hr />
      <Login />
    </div>
  );
}

export default Auth;
