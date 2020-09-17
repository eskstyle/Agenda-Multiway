import * as actionTypes from './actionTypes';

const initialState = {
    empresaId: 1,
    usuario: {
        nome: null,
        senha: null
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
            return state;
        case actionTypes.LOGOUT:
            return {
                ...state,
                usuario: {
                    nome: null,
                    senha: null
                }
            }
        default:
            return state;
    }
}

export default reducer;