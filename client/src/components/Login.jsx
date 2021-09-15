import React, { useState, useEffect } from "react";
import { account } from "../db/appwriteConfig";

const Login = ({ logStatus }) => {
  //Get current user
  const [user, setUser] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    account
      .get()
      .then((res) => {
        setUser(res);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        setUser();
      });
  }, []);

  //Handle login
  const handleLogin = () => {
    account.createOAuth2Session("google", "http://localhost:3000");
  };

  //Handle  Logout
  const handleLogout = () => {
    account
      .deleteSession("current")
      .then((res) => {
        window.location.href = "http://localhost:3000";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {loading ? (  
        <p>Loading ... </p>
      ) : logStatus ? (
        <div className="w-100 text-right">
          <br />
          <p className="mx-5">Hi, {user.name} ({user.email}) </p>
       
          <button onClick={handleLogout} className="btn btn-primary mx-5">
            Logout
          </button>
        </div>
      ) : (
        <div className="w-100 text-right">
          <button onClick={handleLogin} className="btn btn-primary mx-5 mt-5">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
