import React, { useState, useEffect } from "react";
import { FilterForm } from "./FilterForm";

export const JobFilter = () => {
  const [showResults, setShowResults] = useState(false);

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
      {showResults ? <FilterForm /> : null}
    </div>
  );
};
