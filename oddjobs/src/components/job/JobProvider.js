import React, { useState } from "react";
export const JobContext = React.createContext();

export const JobProvider = (props) => {
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    return fetch("http://localhost:8088/jobs?_expand=jobCategory")
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

  const getJobById = (id) => {
    return fetch(`http://localhost:8088/jobs/?${id}`).then((res) => res.json());
  };

  const deleteJob = (id) => {
    return fetch(`http://localhost:8088/jobs/?${id}`, {
      method: "DELETE",
    }).then(getJobs);
  };

  const editJob = (job) => {
    return fetch(`http://localhost:8088/jobs/?${job.id}`, {
      method: "PUT",
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
        getJobById,
        deleteJob,
        editJob,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};
