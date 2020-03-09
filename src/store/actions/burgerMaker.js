import * as types from './actionType'
import axios from '../../axios-orders'

/*
 * action creators
 */

export const addIngredient = (ingredientName) => {
    return {
        type: types.ADD_INGREDIENT,
        ingredientName
    }
}

export const deleteIngredient = (ingredientName) => {
    return {
        type: types.DELETE_INGREDIENT,
        ingredientName
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: types.SET_INGREDIENT,
        ingredients
    }
}

export const fetchFailed = () => {
    return {
        type: types.FETCH_FAILED
    }
}

/*
 * Async Task
 */
export const initIngredient = () => {
    return dispatch => {
      axios.get("https://burger-junkie.firebaseio.com/ingredients.json")
        .then(res => {
            dispatch(setIngredient(res.data))
        })
        .catch(err => {
            dispatch(fetchFailed(err))
        })
    };
}