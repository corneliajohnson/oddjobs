import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { JobContext } from "./JobProvider";

export const JobDetail = () => {
  const { getJobById } = useContext(JobContext);
  const [job, setJob] = useState({});
  const { jobId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getJobById(jobId).then((response) => {
      setJob(response);
    });
  }, []);

  return (
    <section className="job container">
      <h3 className="job_title">{job.title}</h3>
      <div>Posted: {job.posted}</div>
      <div className="row">
        <div className="one-third column">
          {" "}
          Job Category: {job.jobCategory?.name}
        </div>
        <div className="one-third  column">Pay: {job.pay}</div>
        <div className="one-third column"> Location: {job.zipCode}</div>
      </div>
      <p className="job_details">Details: {job.details}</p>
    </section>
  );
};
