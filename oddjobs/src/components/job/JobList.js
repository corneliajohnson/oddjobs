import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "./JobProvider";
import { Job } from "./Job";
import { JobSearch } from "./JobSearch";
import { JobFilter } from "./JobFilter";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { DeleteJob } from "./DeleteJob";
import "./Job.css";

export const JobList = () => {
  const { jobs, getJobs, searchTerms, filteredSearch } = useContext(JobContext);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [filteredJobs, setFiltered] = useState([]);

  const currentUser = localStorage.getItem("user");

  const history = useHistory();

  useEffect(() => {
    getJobs();
  }, []);

  //only show visable jobs
  useEffect(() => {
    const filteredVisibleJobs = jobs.filter((job) => job.visible === true);
    setVisibleJobs(filteredVisibleJobs);
  }, [jobs]);

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      //if blank show all
      const subset = filteredSearch.filter((job) =>
        job.title.toLowerCase().includes(searchTerms)
      );
      setFiltered(subset);
    } else if (filteredSearch != null) {
      setFiltered(filteredSearch);
    } else {
      setFiltered(visibleJobs);
    }
  }, [jobs, searchTerms, visibleJobs]);

  useEffect(() => {
    if (filteredSearch != null) {
      setFiltered(filteredSearch);
    }
  }, [filteredSearch]);

  return (
    <div>
      <div className="jobs-header">
        <h2>Open Jobs</h2>
        <div>
          <button
            onClick={() => {
              if (currentUser) {
                history.push("/jobs/create");
              } else {
                history.push("/login");
              }
            }}
          >
            Add Job
          </button>
        </div>
        <JobSearch />
      </div>
      <div className="jobs row">
        <div className="nine columns jobTable">
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
              {filteredJobs.map((job) => (
                <Job
                  key={job.id}
                  job={job}
                  editBtn={
                    <Link to={`/jobs/edit/${job.id}`} className="editBtn">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  }
                  deleteBtn={<DeleteJob id={job.id} title={job.title} />}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="three columns jobFilters">
          <JobFilter />
        </div>
      </div>
    </div>
  );
};
