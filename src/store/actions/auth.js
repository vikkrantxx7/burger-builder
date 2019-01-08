import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAWUVRh0KqhiSOihKssSEPTGyaHljBBh94', authData)
            .then(resp => {
                console.log(resp)
                dispatch(authSuccess(resp.data))
            })
                .catch(err => {
                    console.log(err)
                    dispatch(authFail(err))
                })
    }
}