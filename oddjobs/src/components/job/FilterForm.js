import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../category/CategoryProvider";

export const FilterForm = () => {
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="s-layout">
      <div className="s-layout__sidebar">
        <nav className="s-sidebar__nav">
          <div>
            <label htmlFor="">Category</label>
            <select name="jobCategoryId" id="jobCatelory" required>
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
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Within Miles</label>
            <input type="number" />
          </div>
          <div>
            <button>Filter</button>
          </div>
          <div>
            <a href="#">Reset</a>
          </div>
        </nav>
      </div>
    </div>
  );
};
