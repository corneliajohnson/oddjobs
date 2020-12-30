import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../category/CategoryProvider";

export const JobFilter = () => {
  return (
    <div className="s-layout">
      <div className="s-layout__sidebar">
        <a className="s-sidebar__trigger" href="#0">
          X
        </a>

        <nav className="s-sidebar__nav">
          <h6>Filters</h6>
          <div>
            <label htmlFor="">Category</label>
            <select name="jobCategoryId" id="jobCatelory" required>
              <option value="0">Select a Catelory</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Zip Code</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Within Miles</label>
            <input type="number" />
          </div>
          <div>
            <button>Search</button>
          </div>
          <div>
            <a href="#">Reset</a>
          </div>
        </nav>
      </div>
    </div>
  );
};
