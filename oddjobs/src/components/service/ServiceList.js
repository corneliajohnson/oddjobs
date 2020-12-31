import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "./ServiceProvider";
import { useHistory } from "react-router-dom";
import { Service } from "./Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { DeleteService } from "./DeleteService";
import { ServiceSearch } from "./ServiceSearch";
import "./Service.css";

export const ServiceList = () => {
  const { services, getServices } = useContext(ServiceContext);
  const [visibleServices, setVisibleServices] = useState([]);
  const currentUser = localStorage.getItem("user");

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
        <h2 className="services_title">Services</h2>
        <button
          onClick={() => {
            if (currentUser) {
              history.push("/services/create");
            } else {
              history.push("/login");
            }
          }}
        >
          Add Service
        </button>
        <div>
          <ServiceSearch />
        </div>
      </div>
      <div className="row">
        <div className="services nine columns">
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
        <div className="three columns services_filters">filters</div>
      </div>
    </div>
  );
};
