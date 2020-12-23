import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "./JobProvider";
import { Job } from "./Job";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteJob } from "./DeleteJob";

export const JobList = () => {
  const { jobs, getJobs } = useContext(JobContext);
  const [visibleJobs, setVisibleJobs] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getJobs();
  }, []);

  //only show visable jobs
  useEffect(() => {
    const filteredVisibleJobs = jobs.filter((job) => job.visible === true);
    setVisibleJobs(filteredVisibleJobs);
  }, [jobs]);

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visibleJobs.map((job) => (
            <Job
              key={job.id}
              job={job}
              editBtn={
                <Link to={`/jobs/edit/${job.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              }
              deleteBtn={<DeleteJob id={job.id} title={job.title} />}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
