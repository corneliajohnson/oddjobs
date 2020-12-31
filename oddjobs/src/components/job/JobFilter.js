import React, { useState, useEffect } from "react";
import { FilterForm } from "./FilterForm";

export const JobFilter = () => {
  const [showResults, setShowResults] = useState(true);

  const onClick = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };
  return (
    <div>
      <input
        className="filterModalBtn"
        type="submit"
        value="Filters"
        onClick={onClick}
      />
      {/* show filters on toggle*/}
      {showResults ? <FilterForm /> : null}
    </div>
  );
};
