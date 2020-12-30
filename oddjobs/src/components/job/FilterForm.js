import React, { useContext, useEffect, useRef, useState } from "react";
import { CategoryContext } from "../category/CategoryProvider";
import { JobContext } from "./JobProvider";

export const FilterForm = () => {
  const { categories, getCategories } = useContext(CategoryContext);
  const { setFilteredSearch, getJobs, jobs } = useContext(JobContext);
  const [visibleJobs, setVisibleJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const jobCategoryId = useRef(null);
  const zipCode = useRef(null);
  const radius = useRef(null);

  //only show visable jobs
  useEffect(() => {
    const filteredVisibleJobs = jobs.filter((job) => job.visible === true);
    setVisibleJobs(filteredVisibleJobs);
  }, [jobs]);

  const handleFilters = () => {
    const categoryId = parseInt(jobCategoryId.current.value);
    const zip = zipCode.current.value;
    // const radiusMiles = radius.current.value;

    if (categoryId !== "0" && categoryId !== 0) {
      const subset = visibleJobs.filter(
        //check for category only
        (job) => job.jobCategoryId === categoryId
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
              }}
            >
              Filter
            </button>
          </div>
          <div>
            <a href="#">Reset</a>
          </div>
        </nav>
      </div>
    </div>
  );
};
