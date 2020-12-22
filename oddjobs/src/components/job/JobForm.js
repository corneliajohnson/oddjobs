import React, { useContext, useState, useEffect } from "react";
import { JobContext } from "./JobProvider";
import { CategoryContext } from "../category/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";

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
    //setIsLoading(true);
    if (jobId) {
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
              required
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
