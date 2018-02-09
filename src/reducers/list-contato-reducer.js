import {
    LISTA_CONTATO_USUARIO
} from '../actions/app-action-type';

const INITIAL_STATE = {
    contatos: []
}

export default (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case LISTA_CONTATO_USUARIO:
            return action.payload; 
        default:
            return {...state}
    }
}