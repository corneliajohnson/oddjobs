import React, { useContext, useEffect } from "react";
import { JobContext } from "./JobProvider";
import { Job } from "./Job";
import { useHistory } from "react-router-dom";

export const JobList = () => {
  const { jobs, getJobs } = useContext(JobContext);

  const history = useHistory();

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="jobs">
      <h2>Open Jobs</h2>
      <button
        onClick={() => {
          history.push("/jobs/create");
        }}
      >
        Add Job
      </button>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Job</th>
            <th>Category</th>
            <th>Pay</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
