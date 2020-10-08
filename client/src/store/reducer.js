import * as actionTypes from './actionTypes';

const initialState = {
    empresaId: 1,
    usuario: {
        usuario: null,
        token: null,
        expiresIn: null,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MUDAR_EMPRESA:
            return {
                ...state,
                empresaId: action.payload
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                usuario: action.payload.usuario,
                senha: action.payload.senha,
                expiresIn: action.payload.expiresIn
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                usuario: {
                    usuario: null,
                    token: null,
                    expiresIn: null
                }
            }
        default:
            return state;
    }
}

export default reducer;