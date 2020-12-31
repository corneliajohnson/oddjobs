import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { JobContext } from "./JobProvider";

export const JobDetail = () => {
  const { getJobById } = useContext(JobContext);
  const [job, setJob] = useState({});
  const { jobId } = useParams();

  useEffect(() => {
    getJobById(jobId).then((response) => {
      setJob(response); //set selected job
    });
  }, []);

  return (
    <section className="jobDetailContainer container">
      <h3 className="job_title">{job.title}</h3>
      <div>Posted: {job.posted}</div>
      <div> Job Category: {job.jobCategory?.name}</div>
      <div className="row">
        <div className="one-half  column">Pay: {job.pay}</div>
        <div className="one-half column"> Location: {job.zipCode}</div>
      </div>
      <p className="job_details">Details: {job.details}</p>
      <Link className="backLink" to="/">
        Back
      </Link>
    </section>
  );
};
