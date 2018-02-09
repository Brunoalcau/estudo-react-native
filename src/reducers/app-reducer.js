import {
    ALTERAR_EMAIL_CONTATO,
    ADD_CONTATO,
    ERRO_FIND_USER,
    USER_EXIST,
    USER_NOT_FOUND,
    SUCCESS,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MESSAGEM
} from '../actions/app-action-type';

const INITIAL_STATE = {
    adicionar_contatos_email: '',
    error: '',
    success: false,
    message: '',
    name: '',
    email: ''
};

export default (state = INITIAL_STATE, action)  => {
    switch (action.type) {
        case ALTERAR_EMAIL_CONTATO: 
            return {...state, adicionar_contatos_email: action.plaload}
        case ADD_CONTATO:
            return {...state }
        case USER_NOT_FOUND: 
            return {...state, error: action.payload}
        case SUCCESS: 
            return {...state, success: action.payload, adicionar_contatos_email: '', error: ''}
        case MODIFICA_MESSAGEM:
            return {...state, message: action.payload}
        default:
            return state;
    }
}