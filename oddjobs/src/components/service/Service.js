import React from "react";
import { Link } from "react-router-dom";

export const Service = ({ service, editBtn, deleteBtn }) => (
  <tr>
    <td>
      <Link to={`/services/detail/${service.id}`}> {service.title}</Link>
    </td>
    <td>{service.jobCategory.name}</td>
    <td>{service.price}</td>
    <td>{service.zipCode}</td>
    {/* only show delete and edit for current user */}
    {service.userId === parseInt(localStorage.getItem("user")) ? (
      <td>
        {editBtn} {deleteBtn}
      </td>
    ) : (
      <td></td>
    )}
  </tr>
);
