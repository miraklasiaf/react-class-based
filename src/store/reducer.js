import * as types from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 5000
}

const INGREDIENT_PRICES = {
  salad: 1000,
  cheese: 1500,
  meat: 3000,
  bacon: 5000
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_INGREDIENT: 
            return {
              ...state,
              ingredients: {
                ...state.ingredients,
                //  The square brackets allow you to use the string 
                //  literals and variables as the property names.
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
              },
              totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case types.DELETE_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default: return state
    }
}   

export default reducer;