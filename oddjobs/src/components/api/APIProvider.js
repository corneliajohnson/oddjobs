import React, { useState } from "react";
export const APIContext = React.createContext();

export const APIProvider = (props) => {
  const [zipCodeRadius, setZipCodeRadius] = useState([]);

  const getZipCodeRadius = (zipCode, radius) => {
    return fetch(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&country=ALL&key=TX3NJ23ONHX4K6NRJRHM`
    )
      .then((res) => res.json())
      .then(setZipCodeRadius);
  };

  return (
    <APIContext.Provider
      className="Provider"
      value={{ getZipCodeRadius, zipCodeRadius, setZipCodeRadius }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
