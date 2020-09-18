import * as actionTypes from './actionTypes';

const initialState = {
    empresaId: 1,
    usuario: {
        usuario: null,
        token: null
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
                senha: action.payload.senha
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                usuario: {
                    usuario: null,
                    token: null
                }
            }
        default:
            return state;
    }
}

export default reducer;