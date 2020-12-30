import React, { useContext } from "react";
import { JobContext } from "./JobProvider";

export const JobSearch = () => {
  const { setSearchTerms } = useContext(JobContext);

  return (
    <>
      <input
        type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for jobs... "
      />
    </>
  );
};
