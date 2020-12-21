import React from "react";
import { JobList } from "./job/JobList";
import { JobProvider } from "./job/JobProvider";

export const ApplicationViews = () => (
  <>
    <JobProvider exact path="/">
      <JobList />
    </JobProvider>
  </>
);
