import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
    searchAccount
} from '../actions/app-action';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
                <TextInput style={style.input} 
                    style={style.input}
                    onChangeText={text => this.props.searchAccount(text)}
                    clearButtonMode="always"
                    placeholder="Pesquisar"
                />
            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 40,
        borderColor: '#C3C3C3',
        borderWidth: 0.5
    },
    input: {
        flex: 3,
        width: 300,
        borderColor: '#C3C3C3',
        backgroundColor: '#f4f4f4',
        borderWidth: 0.5,
        borderStyle: 'solid',
        fontSize: 15,
        borderRadius: 25,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 4,
        marginBottom: 4,
        padding: 3,
        paddingLeft: 10
        
    }
});

const mapStateToProps = (state) => ({
    search: state.ListContatos.search
});

export default connect(mapStateToProps, {
    searchAccount
})(Header);