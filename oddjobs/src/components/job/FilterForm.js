import React, { useContext, useEffect, useRef, useState } from "react";
import { CategoryContext } from "../category/CategoryProvider";
import { APIContext } from "../api/APIProvider";
import { JobContext } from "./JobProvider";

export const FilterForm = () => {
  const { categories, getCategories } = useContext(CategoryContext);
  const { setFilteredSearch, getJobs, jobs, filteredSearch } = useContext(
    JobContext
  );
  const { zipCodeRadius, getZipCodeRadius } = useContext(APIContext);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false); //notify when filter "apply" btn click

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  //use let so the inputs can
  let jobCategoryId = useRef(null);
  let zipCode = useRef(null);
  let radius = useRef(null);

  //only show visable jobs
  useEffect(() => {
    const filteredVisibleJobs = jobs.filter((job) => job.visible === true);
    setVisibleJobs(filteredVisibleJobs);
  }, [jobs]);

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
      const subset = visibleJobs.filter(
        (job) =>
          zipCodes.includes(job.zipCode) &&
          job.jobCategoryId === categoryId &&
          job.zipCode === parseInt(zip)
      );
      setFilteredSearch(subset);
    }
    if (categoryId !== "0" && categoryId !== 0 && zip.length == 5) {
      //check for category and zipcode
      const subset = visibleJobs.filter(
        (job) =>
          job.jobCategoryId === categoryId && job.zipCode === parseInt(zip)
      );
      setFilteredSearch(subset);
    } else if (categoryId !== "0" && categoryId !== 0) {
      //check for category only
      const subset = visibleJobs.filter(
        (job) => job.jobCategoryId === categoryId
      );
      setFilteredSearch(subset);
    } else if (zip.length == 5 && parseInt(radiusMiles) > 0) {
      const zipCodeResponse = zipCodeRadius?.DataList;
      const zipCodes = zipCodeResponse.map((zip) => parseInt(zip.Code));

      const subset = visibleJobs.filter((job) =>
        zipCodes.includes(job.zipCode)
      );
      setFilteredSearch(subset);
    } else if (zip.length == 5) {
      //check for zipcode only
      const subset = visibleJobs.filter((job) => job.zipCode === parseInt(zip));
      setFilteredSearch(subset);
    } else {
      setFilteredSearch(visibleJobs);
    }
  };

  //clear fields for reset btn
  const resetFields = () => {
    jobCategoryId.current.value = 0;
    zipCode.current.value = "";
    radius.current.value = "";
    setFilteredSearch(visibleJobs);
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
                if (
                  parseInt(radius.current.value) > 0 &&
                  zipCode.current.value == ""
                ) {
                  alert("Enter zipcode to find radius");
                } else if (
                  parseInt(radius.current.value) < 1 ||
                  parseInt(radius.current.value) < 200
                ) {
                  alert("Radius must be between 1 and 200 miles");
                } else {
                  handleFilters();
                }

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
