import * as types from './actionType'
import axios from 'axios'

export const authStart = () => {
    return {
        type: types.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: types.AUTH_SUCCESS,
        idToken,
        userId
    }
}

export const authFailed = (error) => {
    return {
        type: types.AUTH_FAILED,
        error
    }
}

export const logout = () => {
    return {
        type: types.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            retunSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPKiYvvgZuvQp80yWnzhCElew_9-VnNv4'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPKiYvvgZuvQp80yWnzhCElew_9-VnNv4'
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error))
            })
    }
}