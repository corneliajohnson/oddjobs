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
  const [btnClicked, setBtnClicked] = useState(false);

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

  useEffect(() => {
    if (zipCode.current.value != "" && radius.current.value != "") {
      getZipCodeRadius(zipCode.current.value, radius.current.value);
    }
  }, [filteredSearch, btnClicked]);

  const handleFilters = () => {
    const categoryId = parseInt(jobCategoryId.current.value);
    const zip = zipCode.current.value;
    const radiusMiles = radius.current.value;

    if (categoryId !== "0" && categoryId !== 0 && zip.length == 5) {
      const subset = visibleJobs.filter(
        //check for category and zipcode
        (job) =>
          job.jobCategoryId === categoryId && job.zipCode === parseInt(zip)
      );
      setFilteredSearch(subset);
    } else if (categoryId !== "0" && categoryId !== 0) {
      const subset = visibleJobs.filter(
        //check for category only
        (job) => job.jobCategoryId === categoryId
      );
      setFilteredSearch(subset);
    } else if (zip.length == 5 && parseInt(radiusMiles) > 0) {
      //check for radius in miles
      // const subset = visibleJobs.filter((job) => job.zipCode === parseInt(zip));
      // setFilteredSearch(subset);
      const zipCodeResponse = zipCodeRadius?.DataList;
      const zipCodes = zipCodeResponse.map((zip) => parseInt(zip.Code));

      const subset = visibleJobs.filter((job) =>
        zipCodes.includes(job.zipCode)
      );
      setFilteredSearch(subset);
    } else if (zip.length == 5) {
      //check for zipcode only
      console.log(zipCodeRadius);
    } else {
      setFilteredSearch(visibleJobs);
    }
  };

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
            <input type="text" ref={zipCode} />
          </div>
          <div>
            <label htmlFor="">Within Radius</label>
            <input type="number" ref={radius} placeholder="in miles..." />
          </div>
          <div>
            <button
              onClick={() => {
                handleFilters();
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
          <div>
            <a
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
