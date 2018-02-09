import React, { Component } from 'react';

import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    TextInput,
    Button
} from 'react-native'
import { connect } from 'react-redux';
import { modificarContatoEmail, addEmailContato } from '../actions/app-action';


class CadastroContatos extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }

    _onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'close') {
                this.props.navigator.dismissModal();
            }
        }
    }
    renderContatos() {
        if(this.props.success) {
            return (
                <View style={style.success}>
                    <Text style={style.textSuccess}>Cadastro do contato realizado com sucesso</Text>
                </View>
            );
        }
        return (
            <View stely={style.container}>
                <View style={style.top}>
                    <TextInput
                        style={style.input}
                        placeholder="Digiti o contato"
                        value={this.props.adicionar_contatos_email}
                        onChangeText={text => this.props.modificarContatoEmail(text)} />
                </View>
                <View style={style.medium}>
                    <View style={style.buttonView}>
                        <Button
                            color="#fff"
                            title="Cadastrar"
                            onPress={() => this.props.addEmailContato(this.props.adicionar_contatos_email)}
                        />
                    </View>
                    <View style={style.error}>
                        <Text style={style.txtError}>{this.props.error}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                {this.renderContatos()}
            </View>
        );
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'

    },
    top: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15

    },
    medium: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 15,
        paddingRight: 15
    },
    input: {
        fontSize: 20,
        height: 45,
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da'
    },
    buttonView: {
        backgroundColor: '#115E54'
    },
    txtError: {
        color: 'red',
        fontSize: 20
    },
    error: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 50,
        marginBottom: 10
    },
    success: {
        justifyContent: 'center',
        paddingTop: 50
    },
    textSuccess: {
        fontSize: 20
    }
})


const mapStateToProps = (state) => (
    {
        adicionar_contatos_email: state.AppReducer.adicionar_contatos_email,
        error: state.AppReducer.error,
        success: state.AppReducer.success
    }
)
export default connect(mapStateToProps, {
    modificarContatoEmail,
    addEmailContato
})(CadastroContatos)