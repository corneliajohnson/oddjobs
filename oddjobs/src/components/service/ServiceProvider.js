import React, { useState } from "react";
export const ServiceContext = React.createContext();

export const ServiceProvider = (props) => {
  const [services, setServices] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredSearch, setFilteredSearch] = useState();

  const getServices = () => {
    return fetch("http://localhost:8088/services?_expand=jobCategory")
      .then((res) => res.json())
      .then(setServices);
  };

  const addService = (service) => {
    return fetch("http://localhost:8088/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    }).then(getServices);
  };

  const getServiceById = (id) => {
    return fetch(
      `http://localhost:8088/services/${id}?_expand=jobCategory`
    ).then((res) => res.json());
  };

  const deleteService = (id) => {
    return fetch(`http://localhost:8088/services/${id}`, {
      method: "DELETE",
    }).then(getServices);
  };

  const editService = (service) => {
    return fetch(`http://localhost:8088/services/${service.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    }).then(getServices);
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        addService,
        getServices,
        getServiceById,
        deleteService,
        editService,
        searchTerms,
        setSearchTerms,
        filteredSearch,
        setFilteredSearch,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};
