import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    ListView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Easing
} from 'react-native';

import _ from 'lodash';

import { connect } from 'react-redux';
import {
    modificaMessagem,
    enviorMessagem
} from '../actions/app-action';
import {
    conversaUsuarioFetch
} from '../actions/app-action';

class Conversa extends Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
    constructor(props) {
        super(props);
        // this._scrollBottom = this._scrollBottom.bind(this);
    }
    static navigatorStyle = {
        tabBarHidden: true,
    }
    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.email);
        this._fontDeDados(this.props.conversa);
    }
    componentDidMount() {
        Animated.spring(
            this.state.fadeAnim,
            {
              toValue: 1,
              duration: 1000,
              easing: Easing.in
            }
          ).start();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.email !== this.props.email) {
            this.props.conversaUsuarioFetch(nextProps.email);
        }
        this._fontDeDados(nextProps.conversa);
    }
    _fontDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.datasource = ds.cloneWithRows(conversa);
    }
    _envarMessage() {
        const { message, name, email } = this.props;
        this.props.enviorMessagem(message, name, email);
    }
    renderRow(data) {
        if (data.type === 'e') {
            return (
                <View style={style.userMessage}>
                    <View style={style.userMessageViewTxt}>
                        <Text style={style.userMessageTxt}>{data.menssagem}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={style.contatoMessage}>
                <View style={style.contatoMessageViewTxt}>
                    <Text style={style.contatoMessageTxt}>{data.menssagem}</Text>
                </View>
            </View>
        );
    }
    _scrollBottom(animated = true) {
        this.scrollView.scrollToEnd({
            animated: animated
        })
    }

    disabled() {
        const { fadeAnim } = this.state;
        if(!this.props.message) {
            return(
                <Animated.View style={{opacity: fadeAnim}}>
                    <Image style={style.button} source={require('../imgs/arrow-disabled.png')} />
                </Animated.View>
            );    
        }
        return(
            <Animated.View>
                <Image style={style.button} source={require('../imgs/arrow.png')} />
            </Animated.View>
        );    
    }
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 65 : 0;
        return (
            <KeyboardAvoidingView style={style.container} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={style.containerMessage}>
                    <ListView
                        ref={(ref) => this.scrollView = ref}
                        onContentSizeChange={() => this._scrollBottom()}
                        enableEmptySections
                        dataSource={this.datasource}
                        renderRow={this.renderRow}
                    />
                </View>
                <View style={style.footer}>
                    <TextInput
                        style={style.inputMessage}
                        value={this.props.message}
                        onFocus={() => this._scrollBottom}
                        onChangeText={text => this.props.modificaMessagem(text)}
                    />
                    <TouchableHighlight disabled={!this.props.message} onPress={this._envarMessage.bind(this)} underlayColor="#fff">
                        {this.disabled()}
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee4dc'
    },
    containerMessage: {
        flex: 1,
        paddingBottom: 20
    },
    footer: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#fff'
    },
    inputMessage: {
        flex: 3,
        fontSize: 15,
        borderColor: '#C3C3C3',
        backgroundColor: '#FFF',
        width: 300,
        borderWidth: 0.5,
        borderStyle: 'solid',
        fontSize: 15,
        borderRadius: 25,
        margin: 6,
        paddingLeft: 10
    },
    button: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        marginRight: 4
    },
    userMessage: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40,
        paddingRight: 10
    },
    userMessageViewTxt: {
        backgroundColor: '#dbf5b4',
        padding: 10,
        elevation: 1,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    userMessageTxt: {
        fontSize: 18,
        color: '#000',
    },
    contatoMessage: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40,
        paddingLeft: 10

    },
    contatoMessageViewTxt: {
        backgroundColor: '#f7f7f7',
        padding: 10,
        elevation: 1,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,

    },
    contatoMessageTxt: {
        color: '#000',
        fontSize: 18,
    }
})


const mapStateToProps = (state) => {
    const conversa = _.map(state.ListConversar, (val, uid) => ({ ...val, uid }));
    return ({
        conversa,
        message: state.AppReducer.message
    });
}


export default connect(mapStateToProps, {
    modificaMessagem,
    enviorMessagem,
    conversaUsuarioFetch
})(Conversa);