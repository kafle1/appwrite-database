import React from "react";
import { account } from "../db/appwriteConfig";

const Login = () => {
  return (
    <div>
      <div className="w-100 text-right">
        <button
          onChange={account.createOAuth2Session("google")}
          className="btn btn-primary mx-5"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
