import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ServiceContext } from "./ServiceProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DeleteService = (service) => {
  const { deleteService } = useContext(ServiceContext);

  //show confirm modal
  const alert = () => {
    confirmAlert({
      title: "Delete Service",
      message: `Are you sure you want to delete ${service.title}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteService(service.id),
        },
        {
          label: "No", //close modal
        },
      ],
    });
  };

  return (
    <a onClick={alert}>
      <FontAwesomeIcon icon={faTrash} />
    </a>
  );
};
