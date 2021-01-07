import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";

export const UserAccount = () => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});

  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    getUserById(currentUser).then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <div className="container" style={{ marginTop: "7em" }}>
      <div className="row">
        <div className="one-half column">Image</div>
        <div className="one-half column">
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                {user.firstName} {user.lastName}
              </div>
              <div className="card-text">{user.email}</div>
              <div className="card-text">{user.phone}</div>
              <div>Number of Post</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div>
          <h3>My Post</h3>
        </div>
      </div>
    </div>
  );
};
