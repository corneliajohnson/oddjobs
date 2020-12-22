import React, { useState, useEffect } from "react";
export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategory] = useState([]);

  const getCategories = () => {
    return fetch("http://localhost:8088/jobcategories")
      .then((res) => res.json())
      .then(setCategory);
  };

  return (
    <CategoryContext.Provider value={{ categories, getCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
