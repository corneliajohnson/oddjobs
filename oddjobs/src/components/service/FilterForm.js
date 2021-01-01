import React, { useContext, useEffect, useRef, useState } from "react";
import { CategoryContext } from "../category/CategoryProvider";
import { APIContext } from "../api/APIProvider";
import { ServiceContext } from "./ServiceProvider";

export const FilterForm = () => {
  const { categories, getCategories } = useContext(CategoryContext);
  const { zipCodeRadius, getZipCodeRadius } = useContext(APIContext);
  const {
    setFilteredSearch,
    getServices,
    services,
    filteredSearch,
  } = useContext(ServiceContext);
  const [visibleServices, setVisibleServices] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false); //notify when filter "apply"

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getServices();
  }, []);

  //use let so the inputs can
  let jobCategoryId = useRef(null);
  let zipCode = useRef(null);
  let radius = useRef(null);

  //only show visible services
  useEffect(() => {
    const subset = services.filter((service) => service.visible === true);
    setVisibleServices(subset);
  }, [services]);

  //only get radius when both zipcode and raduis are filled
  useEffect(() => {
    if (zipCode.current.value != "" && radius.current.value != "") {
      getZipCodeRadius(zipCode.current.value, radius.current.value);
    }
  }, [filteredSearch, btnClicked]);

  const handleFilters = () => {
    const categoryId = parseInt(jobCategoryId.current.value);
    const zip = zipCode.current.value;
    const radiusMiles = radius.current.value;

    if (
      categoryId !== "0" &&
      categoryId !== 0 &&
      zip.length == 5 &&
      parseInt(radiusMiles) > 0
    ) {
      //all filtered
      const zipCodeResponse = zipCodeRadius?.DataList;
      const zipCodes = zipCodeResponse.map((zip) => parseInt(zip.Code));
      const subset = visibleServices.filter(
        (service) =>
          zipCodes.includes(service.zipCode) &&
          service.jobCategoryId === categoryId &&
          service.zipCode === parseInt(zip)
      );
      setFilteredSearch(subset);
    }
    if (categoryId !== "0" && categoryId !== 0 && zip.length == 5) {
      //check for category and zipcode
      const subset = visibleServices.filter(
        (service) =>
          service.jobCategoryId === categoryId &&
          service.zipCode === parseInt(zip)
      );
      setFilteredSearch(subset);
    } else if (categoryId !== "0" && categoryId !== 0) {
      //check for category only
      const subset = visibleServices.filter(
        (service) => service.jobCategoryId === categoryId
      );
      setFilteredSearch(subset);
    } else if (zip.length == 5 && parseInt(radiusMiles) > 0) {
      const zipCodeResponse = zipCodeRadius?.DataList;
      const zipCodes = zipCodeResponse.map((zip) => parseInt(zip.Code));

      const subset = visibleServices.filter((service) =>
        zipCodes.includes(service.zipCode)
      );
      setFilteredSearch(subset);
    } else if (zip.length == 5) {
      //check for zipcode only
      const subset = visibleServices.filter(
        (service) => service.zipCode === parseInt(zip)
      );
      setFilteredSearch(subset);
    } else {
      setFilteredSearch(visibleServices);
    }
  };

  //clear fields for reset btn
  const resetFields = () => {
    jobCategoryId.current.value = 0;
    zipCode.current.value = "";
    radius.current.value = "";
    setFilteredSearch(visibleServices);
  };

  return (
    <div className="s-layout">
      <div className="s-layout__sidebar">
        <nav className="s-sidebar__nav">
          <div>
            <label htmlFor="">Category</label>
            <select
              name="jobCategoryId"
              id="jobCatelory"
              ref={jobCategoryId}
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
          <div>
            <label htmlFor="">Zip Code</label>
            <input type="text" id="zipCode" ref={zipCode} />
          </div>
          <div>
            <label htmlFor="">Radius</label>
            <input
              type="number"
              id="radius"
              ref={radius}
              placeholder="in miles..."
            />
          </div>
          <div className="filterBtn">
            <button
              onClick={() => {
                // if (
                //   parseInt(radius.current.value) > 0 &&
                //   zipCode.current.value == ""
                // ) {
                //   alert("Enter zipcode to find radius");
                // } else if (
                //   parseInt(radius.current.value) < 1 ||
                //   parseInt(radius.current.value) < 200
                // ) {
                //   alert("Radius must be between 1 and 200 miles");
                // } else {
                handleFilters();
                //}
                //btn toggle for radius useEffect
                if (btnClicked === false) {
                  setBtnClicked(true);
                } else {
                  setBtnClicked(false);
                }
              }}
            >
              Filter
            </button>
          </div>
          <div className="resetBtn">
            <a
              className="resetLink"
              href="#"
              onClick={() => {
                resetFields();
              }}
            >
              Reset
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};
