import React from "react";
import { Route } from "react-router-dom";
import { JobList } from "./job/JobList";
import { JobProvider } from "./job/JobProvider";
import { JobForm } from "./job/JobForm";

export const ApplicationViews = () => (
  <>
    <JobProvider>
      <Route exact path="/">
        <JobList />
      </Route>
    </JobProvider>

    <JobProvider>
      <Route exact path="/jobs/create">
        <JobForm />
      </Route>
    </JobProvider>
  </>
);
