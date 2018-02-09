import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import { modificaEmail, modificaSenha, login } from '../actions/auth-action';
import { Navigation } from 'react-native-navigation';

class FormLogin extends Component {
    constructor(props) {
        super(props);

    }

    renderButton() {
        if (this.props.loader) {
            return (
                <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
            )
        }
        return (
            <Button color='#fff' title="Acessar" onPress={() => this._authUser()} ></Button>
        )
    }
    navCadastro() {
        this.props.navigator.setStyle({
            navBarBackgroundColor: 'red'
        })
        this.props.navigator.push({
            screen: 'app9.cadastro',
            title: 'Cadastro',
            navigatorStyle: {
                navBarBackgroundColor: '#115E54',
                navBarTextColor: '#fff',
                navBarButtonColor: '#fff'
            }
        })
    }
    _authUser() {
        const { email, senha } = this.props;
        this.props.login({
            email,
            senha
        });
    }
    render() {
        return (
            <ImageBackground style={style.image} source={require('../imgs/bg.png')}>
                <KeyboardAvoidingView behavior="padding" style={style.container}>
                    <View style={style.title}>
                        <Text style={style.txtTitle}>WhatsApp Clone</Text>
                    </View>
                    <View style={style.form}>
                        <TextInput
                            style={style.input}
                            placeholder="E-email"
                            value={this.props.email}
                            placeholderTextColor="#fff"
                            onChangeText={text => this.props.modificaEmail(text)} />
                        <TextInput
                            secureTextEntry
                            style={style.input}
                            placeholder="Senha"
                            placeholderTextColor="#fff"
                            value={this.props.senha}
                            onChangeText={text => this.props.modificaSenha(text)} />
                        <Text style={style.errorText}>{this.props.errorLogin}</Text>
                        <View style={style.link}>
                            <Text onPress={() => this.navCadastro()} style={style.cadastrar}>Ainda não tem cadastro? Cadastre-se</Text>
                        </View>
                    </View>
                    <View style={style.buttonView}>
                        <View style={style.item}>
                            {this.renderButton()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    link: {
        paddingTop: 5
    },
    image: {
        flex: 1,
        width: undefined,
        alignSelf: 'stretch',
        height: undefined
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    txtTitle: {
        fontSize: 25,
        color: '#fff'
    },
    form: {
        flex: 2
    },
    input: {
        fontSize: 20,
        height: 45,
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da'
    },
    buttonView: {
        flex: 1
    },
    item: {
        backgroundColor: '#115E54'
    },
    errorText: {
        backgroundColor: 'transparent',
        color: 'red'
    },
    cadastrar: {
        fontSize: 15,
        color: '#c3c3c3',
        backgroundColor: 'transparent'
    }
});

const mapStateToProps = state => ({
    email: state.AuthReducer.email,
    senha: state.AuthReducer.senha,
    errorLogin: state.AuthReducer.errorLogin,
    loader: state.AuthReducer.loader
});

export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    login
})(FormLogin);