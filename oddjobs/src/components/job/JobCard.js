import React from "react";
import { Link } from "react-router-dom";

export const JobCard ({job}) => (
  <section className="job">
    <h3 className="job_table">
      <Link to={`/jobs/detail/${job.id}`}>
      </Link>
    </h3>
  </section>
)
