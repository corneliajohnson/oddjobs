import React from "react";
import { Route } from "react-router-dom";
import { JobList } from "./job/JobList";
import { JobProvider } from "./job/JobProvider";
import { JobForm } from "./job/JobForm";
import { JobDetail } from "./job/JobDetail";
import { CategoryProvider } from "./category/CategoryProvider";
import { ServiceProvider } from "./service/ServiceProvider";
import { ServiceList } from "./service/ServiceList";
import { ServiceDetail } from "./service/ServiceDetail";
import { ServiceForm } from "./service/ServiceForm";
import { APIProvider } from "./api/APIProvider";
import { UserProvider } from "./user/UserProvider";
import { UserAccount } from "./user/UserAccount";

export const ApplicationViews = () => (
  <>
    <APIProvider>
      <CategoryProvider>
        <JobProvider>
          <Route exact path="/">
            <JobList />
          </Route>
        </JobProvider>
      </CategoryProvider>
    </APIProvider>

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

    <APIProvider>
      <CategoryProvider>
        <ServiceProvider>
          <CategoryProvider>
            <Route exact path="/services">
              <ServiceList />
            </Route>
          </CategoryProvider>
        </ServiceProvider>
      </CategoryProvider>
    </APIProvider>

    <ServiceProvider>
      <CategoryProvider>
        <Route exact path="/services/detail/:serviceId(\d+)">
          <ServiceDetail />
        </Route>
      </CategoryProvider>
    </ServiceProvider>

    <ServiceProvider>
      <CategoryProvider>
        <Route exact path="/services/create">
          <ServiceForm />
        </Route>
      </CategoryProvider>
    </ServiceProvider>

    <ServiceProvider>
      <CategoryProvider>
        <Route exact path="/services/edit/:serviceId(\d+)">
          <ServiceForm />
        </Route>
      </CategoryProvider>
    </ServiceProvider>

    <UserProvider>
      <Route exact path="/account">
        <UserAccount />
      </Route>
    </UserProvider>
  </>
);
