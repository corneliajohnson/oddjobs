import React, { useState, useEffect } from "react";
export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategory] = useState([]);

  const getCategories = () => {
    return fetch("http://localhost:8088/jobcategories")
      .then((res) => res.json())
      .then(setCategory);
  };

  const getCategoryById = (id) => {
    return fetch(`http://localhost:8088/jobcategories/${id}`).then((res) =>
      res.json()
    );
  };

  return (
    <CategoryContext.Provider
      value={{ categories, getCategories, getCategoryById }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
