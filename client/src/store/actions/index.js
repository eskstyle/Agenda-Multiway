import * as actionsType from '../actionTypes';

export function login(payload) {
    return {
        type: actionsType.LOGIN,
        payload: payload
    }
};

export function logout() {
    return {
        type: actionsType.LOGOUT
    }
};