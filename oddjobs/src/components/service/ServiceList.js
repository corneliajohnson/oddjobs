import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "./ServiceProvider";
import { useHistory } from "react-router-dom";
import { Service } from "./Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { DeleteService } from "./DeleteService";
import { ServiceSearch } from "./ServiceSearch";
import { ServiceFilter } from "./ServiceFilter";
import "./Service.css";

export const ServiceList = () => {
  const { services, getServices, searchTerms, filteredSearch } = useContext(
    ServiceContext
  );
  const [visibleServices, setVisibleServices] = useState([]);
  const [filteredJobs, setFiltered] = useState([]);
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

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching services
      const subset = visibleServices.filter((service) =>
        service.title.toLowerCase().includes(searchTerms)
      );
      setFiltered(subset);
    } else if (filteredSearch != null) {
      setFiltered(filteredSearch);
    } else {
      // If the search field is blank, display all services
      setFiltered(visibleServices);
    }
  }, [searchTerms, services, visibleServices]);

  useEffect(() => {
    if (filteredSearch != null) {
      setFiltered(filteredSearch);
    }
  }, [filteredSearch]);

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
        <div className="services col-9">
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
              {filteredJobs.map((service) => {
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
        <div className="col-3 services_filters">
          <ServiceFilter />
        </div>
      </div>
    </div>
  );
};
