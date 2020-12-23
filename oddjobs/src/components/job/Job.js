import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Job = ({ job }) => (
  <tr>
    <td>
      <Link to={`/jobs/detail/${job.id}`}> {job.title}</Link>
    </td>
    <td>{job.jobCategory.name}</td>
    <td>{job.pay}</td>
    <td>{job.zipCode}</td>
    <td>
      <FontAwesomeIcon icon={faEdit} /> <FontAwesomeIcon icon={faTrash} />
    </td>
  </tr>
);
