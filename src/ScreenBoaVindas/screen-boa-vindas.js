import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    ImageBackground
} from 'react-native';

export class ScreenBoaVindas extends Component {
    _logout() {
        this.props.navigator.push({
            screen: 'app9.login'
        })
    }
    render() {
        return (
            <ImageBackground style={style.image} source={require('../imgs/bg.png')}>
                <View style={style.container}>
                    <View style={style.top}>
                        <Text style={style.txt}>Seja Bem vindo</Text>
                        <Image source={require('../imgs/logo.png')} />
                    </View>
                    <View style={style.footer}>
                        <View style={style.btn}>
                            <Button color="#fff" title="Fazer loggout" onPress={() => this._logout()} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 1
    },
    image: {
        flex: 1,
        width: undefined,
        alignSelf: 'stretch',
        height: undefined
    },
    txt: {
        backgroundColor: 'transparent',
        color: '#fff'
    },
    btn : {
        backgroundColor: '#1565C0',
        margin: 20
    }
});