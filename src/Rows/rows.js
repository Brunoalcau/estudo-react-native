import React, { Component }  from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import { Navigation } from 'react-native-navigation';

export class Row extends Component {
    constructor(props) {
        super(props);
    }


    _renderText() {
        if(this.props.text) {
            return this.props.text
        } else {
            return this.props.email
        }
    }

    render() {
        return (
            <TouchableHighlight onPress={() => this.props.onPress(this.props.nome, this.props.email)} underlayColor="#fff">
                <View style={style.container}>
                    <Image source={require('../imgs/avatar.jpg')}  style={style.photo} />
                    <View style={style.avatar}>
                        <Text style={style.text}>
                            {this.props.nome}
                        </Text>
                        <Text style={style.email}>
                            {this._renderText()}
                        </Text>
                    </View>
                    <View style={style.next}>
                        <Image source={require('../imgs/next.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#CCC',
        borderBottomWidth: 1
    },
    text: {
        marginLeft: 12,
        fontSize: 20
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    avatar: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    email: {
        fontSize: 12,
        marginLeft: 12,
        color: '#c7c7c7'
    },
    next: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})