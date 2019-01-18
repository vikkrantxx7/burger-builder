import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAWUVRh0KqhiSOihKssSEPTGyaHljBBh94'
        if(!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAWUVRh0KqhiSOihKssSEPTGyaHljBBh94'
        }
        axios.post(url, authData)
            .then(resp => {
                dispatch(authSuccess(resp.data.idToken, resp.data.localId))
            })
                .catch(err => {
                    dispatch(authFail(err.response.data.error))
                })
    }
}