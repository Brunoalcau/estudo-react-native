import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
const Principal = props => (
    <View style={style.container}>
        <Text>Pagina inicial da aplicação</Text>
    </View>
);

const style = StyleSheet.create({
    container: {
        marginTop: 100
    }
});

export default Principal;
