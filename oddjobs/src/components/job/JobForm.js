import React, { useContext, useState, useEffect } from "react";
import { JobContext } from "./JobProvider";
import { CategoryContext } from "../category/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";
//import SimpleReactValidator from "simple-react-validator";

export const JobForm = () => {
  const { addJob, getJobById, editJob } = useContext(JobContext);
  const { categories, getCategories } = useContext(CategoryContext);

  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState(true);
  const handleClick = () => {
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const { jobId } = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newJob = { ...job };
    newJob[event.target.name] = event.target.value;
    setJob(newJob);
  };

  const handleJob = () => {
    if (job.jobCategoryId === "0") {
      window.alert("Please select a job category");
    } else {
      if (jobId) {
        //setIsLoading(true);
        editJob({
          id: jobId,
          title: job.title,
          jobCategoryId: job.jobCategoryId,
          pay: job.pay,
          details: job.details,
          userId: 1,
          zipCode: job.zipCode,
          visible: checked,
          posted: Date.now(),
        }).then(() => history.push("/"));
      } else {
        //POST - add
        addJob({
          title: job.title,
          jobCategoryId: job.jobCategoryId,
          pay: job.pay,
          details: job.details,
          userId: 1,
          zipCode: job.zipCode,
          visible: checked,
          posted: Date.now(),
        }).then(() => history.push("/"));
      }
    }
  };

  useEffect(() => {
    getCategories().then(() => {
      if (jobId) {
        getJobById(jobId).then((job) => {
          setJob(job);
          setIsLoading(false);
        });
      } else {
        setIsLoading(true);
      }
    });
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
              maxLength="50"
              value={job.title}
              required
              autoFocus
            />
          </div>
          <div className="six columns">
            <label htmlFor="">Category</label>
            <select
              onChange={handleControlledInputChange}
              onClick={handleClick}
              name="jobCategoryId"
              id="jobCatelory"
              value={job.jobCategoryId}
              required
            >
              <option value="0">Select a Catelory</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <label htmlFor="">Pay</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="jobPay"
              name="pay"
              maxLength="50"
              value={job.pay}
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Zip Code</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="zipCode"
              name="zipCode"
              maxLength="5"
              value={job.zipCode}
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Visible</label>
            <input
              onChange={handleClick}
              id="visible"
              name="visible"
              autoFocus
              type="checkbox"
              checked={checked}
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
            value={job.details}
            required
          ></textarea>
        </div>
        <input
          //disabled={isLoading}
          onClick={(event) => {
            if (job.title && job.pay && job.zipCode) {
              event.preventDefault();
              handleJob();
            }
          }}
          className="button-primary"
          type="submit"
          value="Submit"
        ></input>
      </form>
    </div>
  );
};
