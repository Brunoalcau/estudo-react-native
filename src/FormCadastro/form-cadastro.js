import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaName, criarUsuario, login } from '../actions/auth-action'

class FormCadastro extends Component {

    _cadastrarUsuario() {
        this.props.criarUsuario({
            nome : this.props.nome,
            email: this.props.email,
            senha: this.props.senha
        })
    }
    renderButton() {
        if(this.props.loader) {
            return(
                <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
            )
        }
        return (
            <Button 
            color="#fff" 
            title="Cadastrar" 
            onPress={() => this._cadastrarUsuario()} />
        )
    }
    render() {
        return (
            <ImageBackground style={style.image} source={require('../imgs/bg.png')}>
                <KeyboardAvoidingView style={style.container} behavior="padding">
                        <View style={style.form}>
                            <TextInput style={style.input}
                                value={this.props.nome}
                                placeholder="Nome" 
                                placeholderTextColor="#fff"
                                onChangeText={text => this.props.modificaName(text)} />
                            <TextInput style={style.input}
                                value={this.props.email}
                                placeholderTextColor="#fff"
                                placeholder="E-mail" onChangeText={text => this.props.modificaEmail(text)} />
                            <TextInput style={style.input}
                                value={this.props.senha}
                                placeholderTextColor="#fff"
                                placeholder="Senha" secureTextEntry onChangeText={text => this.props.modificaSenha(text)} />
                            <Text style={style.errorCadastro}>{this.props.errorCadastro}</Text>
                        </View>
                        <View style={style.baixo}>
                            <View style={style.buttons}>
                                {this.renderButton()}
                            </View>
                        </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    form: {
        flex: 3,
        justifyContent: 'center'
    },
    input: {
        height: 45,
        fontSize: 20,
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da'
    },
    baixo: {
        flex: 1
    },
    buttons: {
        backgroundColor: '#115E54'
    },
    image: {
        flex: 1,
        width: undefined,
        alignSelf: 'stretch',
        height: undefined
    },
    errorCadastro: {
        color: 'red',
        backgroundColor: 'transparent'
    }
});

const mapStateToProps = (state) => (
    {
        nome: state.AuthReducer.nome,
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        errorCadastro: state.AuthReducer.errorCadastro,
        loader: state.AuthReducer.loader
    }
)
export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    modificaName,
    criarUsuario,
    login
})(FormCadastro);
