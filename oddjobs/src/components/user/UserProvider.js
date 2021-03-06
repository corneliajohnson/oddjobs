import React from "react";
export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const getUserById = (id) => {
    return fetch(
      `http://localhost:8088/users/${id}?_embed=jobs&_embed=services`
    ).then((res) => res.json());
  };

  return (
    <UserContext.Provider value={{ getUserById }}>
      {props.children}
    </UserContext.Provider>
  );
};
