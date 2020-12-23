import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { JobContext } from "./JobProvider";

export const JobDetail = () => {
  const { getJobById } = useContext(JobContext);
  const [job, setJob] = useState({});
  const [category, setCategory] = useState({});
  const { jobId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getJobById(jobId).then((response) => {
      setJob(response);
    });
  }, []);

  return (
    <section className="job">
      <h3 className="job_title">{job.title}</h3>
      <div className="col">Posted: {job.posted}</div>
      <div className="row">
        <div className="col"> Job Category: {job.jobCategoryId}</div>
        <div className="col">Pay: {job.pay}</div>
        <div className="col"> Location: {job.zipCode}</div>
      </div>
      <p className="job_details">Details: {job.details}</p>
    </section>
  );
};
