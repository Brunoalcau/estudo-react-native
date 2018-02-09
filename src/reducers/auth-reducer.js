import { 
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NAME,
    SUCCESS_LOGIN,
    SUCESSO_CADASTRO,
    ERROR_CADASTRO,
    ERROR_LOGIN,
    RESPOSTA_EM_ANDAMENTO
 } from '../actions/auth-action-type';
const INITIAL_STATE = {
    nome: '',
    email: 'Bruno@teste.com.br',
    senha: '123456',
    errorCadastro: '',
    errorLogin: '',
    loader: false
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NAME: 
            return {...state, nome: action.payload}
        case ERROR_CADASTRO:
            return {...state, errorCadastro: action.payload, loader: false}
        case SUCESSO_CADASTRO:
            return {...state, nome: '', senha: '', loader: false}
        case ERROR_LOGIN: 
            return {...state, errorLogin: action.payload, loader: false}
        case SUCCESS_LOGIN: 
            return {...state, loader: false}
        case RESPOSTA_EM_ANDAMENTO: 
            return {...state, loader: true}
        default:
            return state;
    }
}