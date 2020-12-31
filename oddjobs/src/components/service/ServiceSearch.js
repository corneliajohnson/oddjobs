import React, { useContext } from "react";
import { ServiceContext } from "./ServiceProvider";

export const ServiceSearch = () => {
  const { setSearchTerms } = useContext(ServiceContext);

  return (
    <>
      <input
        type="text"
        className="input--wide searchInput"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for services... "
      />
    </>
  );
};
