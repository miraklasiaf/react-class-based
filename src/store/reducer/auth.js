import * as types from '../actions/actionType'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case types.AUTH_START: return authStart(state)
        case types.AUTH_SUCCESS: return authSuccess(state, action)
        case types.AUTH_FAILED: return authFailed(state, action)
        case types.AUTH_LOGOUT: return authLogout(state)
        case types.AUTH_REDIRECT: return authRedirect(state, action)
        default: return state;
    }
}

const authStart = (state) => ({
    ...state,
    error: null,
    loading: true
})

const authSuccess = (state, action) => ({
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
})

const authFailed = (state, action) => ({
    ...state,
    error: action.error,
    loading: false
})

const authLogout = (state) => ({
    ...state,
    token: null,
    userId: null
})

const authRedirect = (state, action) => ({
    ...state,
    authRedirectPath: action.path 
})

export default reducer