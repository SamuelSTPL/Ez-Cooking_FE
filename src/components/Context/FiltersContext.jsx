import React, { createContext, useState } from "react";

export const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const [ingredientFilters, setIngredientFilters] = useState([]);
  const [mealFilters, setMealFilters] = useState(null);
  const [dietFilters, setDietFilters] = useState(null);

  let combinedFilters = {};
  if (ingredientFilters) {
    combinedFilters.ingredientFilters = ingredientFilters;
  }
  if (mealFilters) {
    combinedFilters.mealFilters = mealFilters;
  }
  if (ingredientFilters) {
    combinedFilters.dietFilters = dietFilters;
  }

  return (
    <FiltersContext.Provider
      value={{
        ingredientFilters,
        setIngredientFilters,
        mealFilters,
        setMealFilters,
        dietFilters,
        setDietFilters,
        combinedFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
