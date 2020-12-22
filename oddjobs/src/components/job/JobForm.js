import React, { useContext, useState, useEffect } from "react";
import { JobContext } from "./JobProvider";
import { useHistory, useParams } from "react-router-dom";

export const JobForm = () => {
  const { addJob, getJobById, editJob } = useContext(JobContext);

  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { jobId } = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newJob = { ...job };
    newJob[event.target.name] = event.target.value;
    setJob(newJob);
  };

  const handleJob = () => {
    //setIsLoading(true);
    if (jobId) {
    } else {
      //POST - add
      console.log({
        title: job.title,
        jobCategoryId: job.jobCategoryId,
        pay: job.pay,
        details: job.details,
        userId: 1,
        zipCode: job.zipCode,
        visible: true,
        posted: Date.now(),
      });
      //.then(() => history.push("/"));
    }
  };

  useEffect(() => {
    if (jobId) {
      getJobById(jobId).then((job) => {
        setJob(job);
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
    }
  }, []);

  return (
    <div className="container">
      <h4>Add New Job</h4>
      <form>
        <div className="row">
          <div className="six columns">
            <label htmlFor="">Title</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="jobTitle"
              name="title"
              required
              autoFocus
            />
          </div>
          <div className="six columns">
            <label htmlFor="">Category</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="jobCatelory"
              name="jobCategoryId"
              required
              autoFocus
            />
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <label htmlFor="">Pay</label>
            <input type="number" id="jobPay" name="pay" required autoFocus />
          </div>
          <div className="four columns">
            <label htmlFor="">Zip Code</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="pay"
              name="pay"
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Visible</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="visible"
              name="visible"
              required
              autoFocus
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="">Details</label>
          <textarea
            onChange={handleControlledInputChange}
            className="u-full-width"
            placeholder="Decription of job"
            id="details"
            name="details"
          ></textarea>
        </div>
        <input
          //disabled={isLoading}
          onClick={(event) => {
            event.preventDefault();
            handleJob();
          }}
          className="button-primary"
          type="submit"
          value="Submit"
        ></input>
      </form>
    </div>
  );
};
