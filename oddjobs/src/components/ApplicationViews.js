import React from "react";
import { Route } from "react-router-dom";
import { JobList } from "./job/JobList";
import { JobProvider } from "./job/JobProvider";
import { JobForm } from "./job/JobForm";
import { JobDetail } from "./job/JobDetail";
import { CategoryProvider } from "./category/CategoryProvider";
import { ServiceProvider } from "./service/ServiceProvider";
import { ServiceList } from "./service/ServiceList";

export const ApplicationViews = () => (
  <>
    <JobProvider>
      <Route exact path="/">
        <JobList />
      </Route>
    </JobProvider>

    <CategoryProvider>
      <JobProvider>
        <Route exact path="/jobs/create">
          <JobForm />
        </Route>
      </JobProvider>
    </CategoryProvider>

    <CategoryProvider>
      <JobProvider>
        <Route exact path="/jobs/edit/:jobId(\d+)">
          <JobForm />
        </Route>
      </JobProvider>
    </CategoryProvider>

    <CategoryProvider>
      <JobProvider>
        <Route exact path="/jobs/detail/:jobId(\d+)">
          <JobDetail />
        </Route>
      </JobProvider>
    </CategoryProvider>

    <ServiceProvider>
      <CategoryProvider>
        <Route exact path="/services">
          <ServiceList />
        </Route>
      </CategoryProvider>
    </ServiceProvider>
  </>
);
