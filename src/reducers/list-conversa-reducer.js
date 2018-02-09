import {
    LISTA_USUARIO_MENSAGEM
} from '../actions/app-action-type'
const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LISTA_USUARIO_MENSAGEM:
            return action.payload;
        default:
            return {...state};
    }
}