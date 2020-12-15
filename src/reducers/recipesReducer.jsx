const initialState = {
  status: "idle",
  filters: null,
  vegetarian: {
    recipes: [],
    pageNumber: 0,
  },
  vegan: {
    recipes: [],
    pageNumber: 0,
  },
  dessert: {
    recipes: [],
    pageNumber: 0,
  },
  mainCourse: {
    recipes: [],
    pageNumber: 0,
  },
  filtered: {
    recipes: [],
    pageNumber: 0,
  },
};

export const recipesReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case "REQUEST_RECIPES_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_RECIPES_DATA": {
      console.log(action);

      return {
        ...state,
        status: "idle",
        [action.data.type]: { recipes: [...action.data.recipes] },
      };
    }
    case "REQUEST_RECIPES_DATA_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
};
