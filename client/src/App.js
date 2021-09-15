import React, { useEffect, useState } from "react";
import Recipe from "./components/Recipe";
import { account } from "./db/appwriteConfig";
import Login from "./components/Login";

function App() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    account
      .get()
      .then((res) => {
        setloading(false);
        setLoggedIn(true);
        setUser(res);
        seterror("");
      })
      .catch((err) => {
        setloading(false);
        setLoggedIn(false);
        setUser();
        seterror(err.message);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : loggedIn ? (
        <Recipe loggedIn={true} />
      ) : (
        <div>
          <Login logStatus={false} />
          <h3 className="text-center">Login to access the app</h3>
        </div>
      )}

    </div>
  );
}

export default App;
