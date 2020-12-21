import React from "react";
import { JobList } from "./job/JobList";
import { JobProvider } from "./job/JobProvider";

export const OddJobs = () => (
  <>
    <JobProvider>
      <JobList />
    </JobProvider>
  </>
);
