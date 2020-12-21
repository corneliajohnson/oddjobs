import React from "react";

export const Job = ({ job }) => (
  <tr>
    <td>{job.title}</td>
    <td>{job.jobCategory.name}</td>
    <td>{job.pay}</td>
    <td>{job.zipCode}</td>
  </tr>
);
