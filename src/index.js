import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import FormCadastro from './FormCadastro/form-cadastro';
import {
    theme
} from './config/theme'
export class Index extends Component {
    render() {
        return(
            <View>
                <ThemeProvider theme={theme}>
                    <FormCadastro />
                </ThemeProvider>
            </View>
        )
    }
}