import firebase, { auth } from 'firebase';
import { Navigation } from 'react-native-navigation';
import b64 from 'base-64';
import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NAME,
    SUCCESS_LOGIN,
    SUCESSO_CADASTRO,
    ERROR_CADASTRO,
    ERROR_LOGIN,
    RESPOSTA_EM_ANDAMENTO
} from './auth-action-type';
import registerScreens from '../Screens/screens';

export const modificaEmail = (text) => {
    return {
        type: MODIFICA_EMAIL,
        payload: text
    }
}

export const modificaSenha = (text) => {
    return {
        type: MODIFICA_SENHA,
        payload: text
    }
}

export const login = (user) => {
    return dispatch => {
        dispatch({ type: RESPOSTA_EM_ANDAMENTO });
        firebase.auth().FacebookAuthProvider(user.email, user.senha)
            .then(success => loginSuccess(user, dispatch))
            .catch(error => loginError(error, dispatch))
    }
}

export const modificaName = (text) => {
    return {
        type: MODIFICA_NAME,
        payload: text
    }
}

export const criarUsuario = (user) => {
    return dispatch => {
        dispatch({ type: RESPOSTA_EM_ANDAMENTO });
        firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
            .then(req => {
                const email = b64.encode(user.email);
                firebase.database().ref(`/contatos/${email}`)
                    .push({ nome: user.nome })
                    .then(value => cadastradoComSucesso(req, dispatch));
            })
            .catch(error => cadastroComError(error, dispatch));
    }
}

const _switchToTabBased = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Contatos',
                screen: 'app9.contatos',
                title: 'Contatos',
                icon: require('../imgs/contato.png'),
                navigatorButtons: {
                    rightButtons: [{
                        title: 'Cadastro Contatos',
                        icon: require('../imgs/addContato.png'),
                        id: 'cadastrar',
                    }]
                }
            },
            {
                label: 'Conversas',
                screen: 'app9.listContato',
                title: 'Conversas',
                icon: require('../imgs/conversa.png')
            },
            {
                label: 'Configuração',
                screen: 'app9.configuracao',
                title: 'Configuração',
                icon: require('../imgs/config.png')
            }

            
        ],
        tabsStyle: {
            tabBarBackgroundColor: '#fff'
        },
        animationType: 'slide-down',
        type: 'TheSideBar'
    });
}

const loginError = (error, dispatch) => {
    dispatch({
        type: 'ERROR_LOGIN',
        payload: error.message
    })
}

const loginSuccess = (user, dispatch) => {
    dispatch({
        type: SUCCESS_LOGIN,
        payload: user
    })
    _switchToTabBased();
}

const cadastradoComSucesso = (user, dispatch) => {
    dispatch({ type: SUCESSO_CADASTRO, payload: user });
}

const cadastroComError = (error, dispatch) => {
    dispatch({
        type: ERROR_CADASTRO,
        payload: error.message
    });
}