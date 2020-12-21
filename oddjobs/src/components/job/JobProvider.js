import React, { useState, useEffect } from "react";
export const JobContext = React.createContext();

export const JobProvider = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    return fetch("http://localhost:8088/jobs")
      .then((res) => res.json())
      .then(setJobs);
  };

  const addJob = (job) => {
    return fetch("http://localhost:8088/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    }).then(getJobs);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        getJobs,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};
