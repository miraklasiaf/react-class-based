import * as types from './actionType'
import axios from 'axios'

export const authStart = () => ({
    type: types.AUTH_START
})

export const authSuccess = (idToken, userId) => ({
    type: types.AUTH_SUCCESS,
    idToken,
    userId
})

export const authFailed = (error) => ({
    type: types.AUTH_FAILED,
    error
})

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: types.AUTH_LOGOUT
    }
}

export const authRedirect = (path) => ({
    type: types.AUTH_REDIRECT,
    path
})

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
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPKiYvvgZuvQp80yWnzhCElew_9-VnNv4'
        if(isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPKiYvvgZuvQp80yWnzhCElew_9-VnNv4'
        }
        const authData = { email, password, returnSecureToken: true }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000))
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if(token && (expirationDate > new Date())){
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId))
            dispatch(checkAuthTimeout( ( expirationDate.getTime() - new Date().getTime() ) / 1000) )
        } else {
            dispatch(logout())
        }
    }
}