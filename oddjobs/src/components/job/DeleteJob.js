import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { JobContext } from "./JobProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DeleteJob = (job) => {
  const { deleteJob } = useContext(JobContext);

  //show confirm modal
  const alert = () => {
    confirmAlert({
      title: "Delete Job",
      message: `Are you sure you want to delete ${job.title}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteJob(job.id),
        },
        {
          label: "No", //close modal
        },
      ],
    });
  };

  return (
    <a className="deleteBtn" onClick={alert}>
      <FontAwesomeIcon icon={faTrash} />
    </a>
  );
};
