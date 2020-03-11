import * as types from '../actions/actionType'

const initialState = {
    ingredients: null,
    totalPrice: 5000,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 1000,
    cheese: 1500,
    meat: 3000,
    bacon: 5000
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_INGREDIENT:
        return addIngredient(state, action);
      case types.DELETE_INGREDIENT:
        return deleteIngredient(state, action);
      case types.SET_INGREDIENT:
        return setIngredient(state, action);
      case types.FETCH_FAILED:
        return fetchFailed(state);
      default:
        return state;
    }
}

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      //  The square brackets allow you to use the string
      //  literals and variables as the property names.
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const deleteIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const setIngredient = (state, action) => {
  return {
    ...state,
    ingredients: action.ingredients,
    totalPrice: 5000,
    error: false,
    building: false
  };
};

const fetchFailed = (state) => {
  return {
    ...state,
    error: true
  };
};

export default reducer;