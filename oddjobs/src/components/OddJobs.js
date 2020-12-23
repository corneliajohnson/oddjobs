import React from "react";
import { Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

export const OddJobs = () => (
  <>
    <Route
      render={() => {
        return (
          <>
            <NavBar />
            <ApplicationViews />
          </>
        );
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
