import React from "react";
import { Link } from "react-router-dom";

export const Job = ({ job, editBtn, deleteBtn }) => (
  <tr>
    <td>
      <Link to={`/jobs/detail/${job.id}`}> {job.title}</Link>
    </td>
    <td>{job.jobCategory.name}</td>
    <td>{job.pay}</td>
    <td>{job.zipCode}</td>
    {/* only show delete and edit for current user */}
    {job.userId === parseInt(localStorage.getItem("user")) ? (
      <td>
        {editBtn} {deleteBtn}
      </td>
    ) : (
      <td></td>
    )}
  </tr>
);
