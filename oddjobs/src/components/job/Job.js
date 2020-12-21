import React from "react";

export const Job = ({ job }) => (
  <tr>
    <td>{job.title}</td>
    <td>{job.jobCateloryId}</td>
    <td>{job.pay}</td>
    <td>{job.zipCode}</td>
  </tr>
);
