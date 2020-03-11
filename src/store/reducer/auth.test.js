import reducer from './auth'
import * as types from "../actions/actionType";

describe('auth reducer', () => {
    it('return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        });
    })

    it('store the token after login', () => {
        expect(
          reducer(
            {
              token: null,
              userId: null,
              error: null,
              loading: false,
              authRedirectPath: "/"
            },
            {
              type: types.AUTH_SUCCESS,
              idToken: "some-token",
              userId: "some-user-id"
            }
          )
        ).toEqual({
          token: 'some-token',
          userId: 'some-user-id',
          error: null,
          loading: false,
          authRedirectPath: "/"
        });
    })
})