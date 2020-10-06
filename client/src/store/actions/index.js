import * as actionsType from '../actionTypes';

export function login(payload) {
    console.log(payload);
    return {
        type: actionsType.LOGIN,
        payload: payload
    }
};