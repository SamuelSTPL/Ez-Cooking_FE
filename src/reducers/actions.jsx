//Recipes
//Include recipes and types of recipes inside Data
export const requestRecipesData = () => ({
  type: "REQUEST_RECIPES_DATA",
});

export const receivedRecipesData = (data) => ({
  type: "RECEIVED_RECIPES_DATA",
  data,
});

export const receivedRecipesDataError = () => ({
  type: "RECEIVED_RECIPES_DATA_ERROR",
});
