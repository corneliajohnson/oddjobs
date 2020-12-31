import React, { useState } from "react";
// import { FilterForm } from "./FilterForm";

export const ServiceFilter = () => {
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
      {showResults ? "on" : null}
    </div>
  );
};
