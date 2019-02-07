import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            loading: false,
            error: null,
            authRedirectUrl: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            loading: false,
            error: null,
            authRedirectUrl: '/'
        });
    });
});
