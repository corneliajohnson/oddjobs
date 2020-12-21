import React, { useContext, useState, useEffect } from "react";
import { JobContext } from "./JobProvider";
import { useHistory, useParams } from "react-router-dom";

export const JobForm = () => {
  const { addJob } = useContext(JobContext);

  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newJob = { ...job };
    newJob[event.target.name] = event.target.value;
    setJob(newJob);
  };

  const handleJob = () => {
    //POST - add
    addJob({}).then(() => history.push("/"));
  };

  return (
    <div className="container">
      <h4>Add New Job</h4>
      <form>
        <div className="row">
          <div className="six columns">
            <label htmlFor="">Title</label>
            <input type="text" id="jobTitle" name="title" required autoFocus />
          </div>
          <div className="six columns">
            <label htmlFor="">Category</label>
            <input
              type="text"
              id="jobCatelory"
              name="jobCateloryId"
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
              type="text"
              id="jobCatelory"
              name="jobCateloryId"
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Visible</label>
            <input type="text" id="visible" name="visible" required autoFocus />
          </div>
        </div>
        <div className="row">
          <label htmlFor="">Details</label>
          <textarea
            className="u-full-width"
            placeholder="Decription of job"
            id="details"
            name="details"
          ></textarea>
        </div>
        <input class="button-primary" type="submit" value="Submit"></input>
      </form>
    </div>
  );
};
