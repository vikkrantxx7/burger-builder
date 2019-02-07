import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectUrl: '/'
}

const authStart = (state) => {
    return updateObject(state, {error: null, loading: true})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const setAuthRedirectUrl = (state, action) => {
    return updateObject(state, {authRedirectUrl: action.url})
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null})
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_URL: return setAuthRedirectUrl(state, action)
        default: return state
    }
}

export default reducer