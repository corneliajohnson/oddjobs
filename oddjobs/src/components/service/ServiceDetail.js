import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ServiceContext } from "./ServiceProvider";

export const ServiceDetail = () => {
  const { getServiceById } = useContext(ServiceContext);
  const [service, setService] = useState({});
  const { serviceId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getServiceById(serviceId).then((response) => {
      setService(response);
    });
  }, []);

  return (
    <section className="service container">
      <h3 className="service_title">{service.title}</h3>
      <div>Posted: {service.posted}</div>
      <div className="row">
        <div className="one-third column">
          {" "}
          Service Category: {service.jobCategory?.name}
        </div>
        <div className="one-third  column">Price: {service.price}</div>
        <div className="one-third column"> Location: {service.zipCode}</div>
      </div>
      <p className="service_details">Details: {service.details}</p>
    </section>
  );
};
