import {
    ALTERAR_EMAIL_CONTATO,
    ADD_CONTATO,
    USER_NOT_FOUND,
    SUCCESS,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MESSAGEM,
    ENVIO_MESSAGE,
    LISTA_CONVERSAR_USUARIO,
    SEARCH_ACCOUNT,
    LISTA_USUARIO_MENSAGEM
    
} from './app-action-type';
import b64 from 'base-64';
import firebase, { auth, database } from 'firebase';
import _ from 'lodash';

export const modificarContatoEmail = (text) => {
    return {
        type: ALTERAR_EMAIL_CONTATO,
        plaload: text
    }
}

export const addEmailContato = (email) => {
    const email64 = b64.encode(email);
    return dispatch => {
        firebase.database().ref(`/contatos/${email64}`)
            .once('value',snapshot => {
                if (snapshot.val()) {
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    const { currentUser } = firebase.auth();
                    const emailBase64 = b64.encode(currentUser.email.charAt().toUpperCase().concat(currentUser.email.substring(1)));
                    firebase.database().ref(`/usuario_contatos/${emailBase64}`)
                        .push({ email: email, nome: dadosUsuario.nome })
                        .then((res) => success(res, dispatch))
                        .catch(erro => error(error, dispatch));

                } else {
                    userNotFound(dispatch);
                }
            });
    }
}


export const newContato = () => {
    return ({
        type: SUCCESS,
        payload: false
    })
}

export const modificaMessagem = (text) => {
    return {
        type: MODIFICA_MESSAGEM,
        payload: text
    }
}
export const enviorMessagem = (text, name, email) => {
    const { currentUser } = firebase.auth();
    const emailUser = currentUser.email.charAt().toUpperCase().concat(currentUser.email.substring(1));
    return dispatch => {
        const usuarioEmail64 = b64.encode(emailUser);
        const contatoEmail64 = b64.encode(email);
        firebase.database().ref(`/messagens/${usuarioEmail64}/${contatoEmail64}`)
            .push({ menssagem: text, type: 'e' })
            .then(() => {
                firebase.database().ref(`/messagens/${contatoEmail64}/${usuarioEmail64}`)
                    .push({ menssagem: text, type: 'r' })
                    .then(() => dispatch({
                        type: MODIFICA_MESSAGEM,
                        payload: ''
                    }))
                    .then(() => {
                        firebase.database().ref(`/usuario_conversa/${usuarioEmail64}/${contatoEmail64}`)
                        .set({ nome: name, email: email, text: text });
                    })
                    .then(() => {
                        firebase.database().ref(`/contatos/${usuarioEmail64}`)
                            .once('value')
                            .then(snapshot => {
                                const dadosUsuario = _.first(_.values(snapshot.val()));
                                firebase.database().ref(`/usuario_conversa/${contatoEmail64}/${usuarioEmail64}`)
                                .set({ nome: dadosUsuario.nome, email: email })
                            }).catch((errContatos) => console.log(errContatos))
                    })
                    .catch(errorMessagens => console.log(errorMessagens))
            })
            .catch(errorMessagens => console.log(errorMessagens))

    }
}

export const contatosUsuarioFetch = (dispatch) => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        const email64 = b64.encode(currentUser.email.charAt().toUpperCase().concat(currentUser.email.substring(1)));
        firebase.database().ref(`/usuario_contatos/${email64}`)
            .on('value', (snapshot => {
                dispatch({
                    type: LISTA_CONTATO_USUARIO,
                    payload: snapshot.val()
                })
            }));
    }
}
export const listaConversaUsuarioFetch = () => {
    const { currentUser } = firebase.auth();
    const email64 = b64.encode(currentUser.email.charAt().toUpperCase().concat(currentUser.email.substring(1)));
    return dispatch => {
        firebase.database().ref(`/usuario_conversa/${email64}`)
        .on('value', (snapshot) => {
            dispatch({
                type: LISTA_USUARIO_MENSAGEM,
                payload: snapshot.val()
            })
        });
    }
    
}

export const conversaUsuarioFetch = (email) => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        const userEmail64 = b64.encode(currentUser.email.charAt().toUpperCase().concat(currentUser.email.substring(1)));
        const contatoEmail64 = b64.encode(email);
        firebase.database().ref(`/messagens/${userEmail64}/${contatoEmail64}`)
        .on('value', snapshot => {
            dispatch({
                type: LISTA_CONVERSAR_USUARIO,
                payload: snapshot.val()
            });
        });
    }
}

export const searchAccount = (text) => {
    return {
        type: SEARCH_ACCOUNT,
        payload: text
    }
}

const userNotFound = (dispatch) => {
    dispatch({
        type: USER_NOT_FOUND,
        payload: 'user not added not available'
    })
}

const error = (error, dispatch) => {
    dispatch({
        type: USER_NOT_FOUND,
        payload: error.message
    })
}

const success = (success, dispatch) => {
    dispatch({
        type: SUCCESS,
        payload: true
    })
}
