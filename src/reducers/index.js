import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import AppReducer from './app-reducer.js';
import ListContatos from './list-contato-reducer';
import ListConversar from './list-message-reducer';
import ListMensagemUsuario from './list-conversa-reducer';

export default combineReducers({
    AuthReducer,
    AppReducer,
    ListContatos,
    ListConversar,
    ListMensagemUsuario
})