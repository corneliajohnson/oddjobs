import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "./ServiceProvider";
import { useHistory } from "react-router-dom";
import { Service } from "./Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { DeleteService } from "./DeleteService";

export const ServiceList = () => {
  const { services, getServices } = useContext(ServiceContext);
  const [visibleServices, setVisibleServices] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getServices();
  }, []);

  //only show visable services
  useEffect(() => {
    const filteredVisibleServices = services.filter(
      (service) => service.visible === true
    );
    setVisibleServices(filteredVisibleServices);
  }, [services]);

  return (
    <div>
      <div className="service_header">
        <h2>Services</h2>
      </div>
      <div className="services">
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Job</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleServices.map((service) => {
              return (
                <Service
                  key={service.id}
                  service={service}
                  editBtn={
                    <Link to={`/services/edit/${service.id}`}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  }
                  deleteBtn={
                    <DeleteService id={service.id} title={service.title} />
                  }
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
