import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { UserPostCard } from "./UserPostCard";

export const UserAccount = () => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);

  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    getUserById(currentUser).then((response) => {
      setUser(response);
      setJobs(response.jobs);
      setServices(response.services);
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
          <h3>My Activity</h3>
          <div>
            {jobs?.map((job) => (
              <UserPostCard key={job.id} post={job} />
            ))}
          </div>
          <div>
            {services?.map((service) => (
              <UserPostCard key={service.id} post={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
