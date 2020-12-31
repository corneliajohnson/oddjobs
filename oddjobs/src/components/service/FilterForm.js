import React, { useContext, useEffect, useRef, useState } from "react";
import { CategoryContext } from "../category/CategoryProvider";

export const FilterForm = () => {
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

  //use let so the inputs can
  let jobCategoryId = useRef(null);
  let zipCode = useRef(null);
  let radius = useRef(null);

  return (
    <>
      <div>
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
        <div>
          <label htmlFor="">Price Range</label>
          <div className="row">
            <div className="four columns">
              <input type="number" placeholder="min" />
            </div>
            <div className="four columns">
              <input type="number" placeholder="max" />
            </div>
          </div>
        </div>
        <div>
          <button>Apply</button>
        </div>
        <div>
          <a href="#">Reset</a>
        </div>
      </div>
    </>
  );
};
