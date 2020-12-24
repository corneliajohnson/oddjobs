import React, { useContext, useState, useEffect } from "react";
import { ServiceContext } from "./ServiceProvider";
import { CategoryContext } from "../category/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";

export const ServiceForm = () => {
  const { addService, getServiceById, editService } = useContext(
    ServiceContext
  );
  const { categories, getCategories } = useContext(CategoryContext);

  const [service, setService] = useState({});
  const [checked, setChecked] = useState(true);
  const handleClick = () => {
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const { serviceId } = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newService = { ...service };
    newService[event.target.name] = event.target.value;
    setService(newService);
  };

  const handleService = () => {
    if (service.jobCategoryId === "0") {
      window.alert("Please select a service category");
    } else {
      if (serviceId) {
        editService({
          id: serviceId,
          title: service.title,
          jobCategoryId: service.jobCategoryId,
          price: service.price,
          details: service.details,
          userId: parseInt(localStorage.getItem("user")),
          zipCode: service.zipCode,
          serviceRadius: service.serviceRadius,
          visible: checked,
          posted: Date.now(),
        }).then(() => history.push("/services"));
      } else {
        addService({
          title: service.title,
          jobCategoryId: service.jobCategoryId,
          price: service.price,
          details: service.details,
          userId: parseInt(localStorage.getItem("user")),
          zipCode: service.zipCode,
          serviceRadius: service.serviceRadius,
          visible: checked,
          posted: Date.now(),
        }).then(() => history.push("/services"));
      }
    }
  };

  useEffect(() => {
    getCategories().then(() => {
      if (serviceId) {
        getServiceById(serviceId).then((service) => {
          setService(service);
        });
      }
    });
  }, []);

  return (
    <div className="container">
      <h4>{serviceId ? <>Edit Service</> : <>Add New Service</>}</h4>
      <form>
        <div className="row">
          <div className="six columns">
            <label htmlFor="">Title</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="serviceTitle"
              name="title"
              maxLength="50"
              value={service.title}
              required
              autoFocus
            />
          </div>
          <div className="six columns">
            <label htmlFor="">Category</label>
            <select
              onChange={handleControlledInputChange}
              onClick={handleClick}
              name="jobCategoryId"
              id="jobCatelory"
              value={service.jobCategoryId}
              required
            >
              <option value="0">Select a Catelory</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <label htmlFor="">Price</label>
            <input
              onChange={handleControlledInputChange}
              type="text"
              id="servicePrice"
              name="price"
              maxLength="50"
              value={service.price}
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Zip Code</label>
            <input
              onChange={handleControlledInputChange}
              type="number"
              id="zipCode"
              name="zipCode"
              maxLength="5"
              value={service.zipCode}
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Service Radius</label>
            <input
              onChange={handleControlledInputChange}
              type="number"
              id="serviceRadius"
              name="serviceRadius"
              maxLength="6"
              value={service.serviceRadius}
              required
              autoFocus
            />
          </div>
          <div className="four columns">
            <label htmlFor="">Visible</label>
            <input
              onChange={handleClick}
              id="visible"
              name="visible"
              autoFocus
              type="checkbox"
              checked={checked}
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="">Details</label>
          <textarea
            onChange={handleControlledInputChange}
            className="u-full-width"
            placeholder="Decription of service"
            id="details"
            name="details"
            value={service.details}
            required
          ></textarea>
        </div>
        <input
          //disabled={isLoading}
          onClick={(event) => {
            if (service.title && service.price && service.zipCode) {
              event.preventDefault();
              handleService();
            }
          }}
          className="button-primary"
          type="submit"
          value="Submit"
        ></input>
      </form>
    </div>
  );
};
