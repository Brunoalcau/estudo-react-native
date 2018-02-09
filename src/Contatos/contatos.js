import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    ListView,
    StyleSheet,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { newContato, contatosUsuarioFetch } from '../actions/app-action';
import { Row } from '../Rows/rows';
import Header from '../Header/header';

import ListViewPark from '../ListView/list-view';

class Contato extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
        this.conversa = this.conversa.bind(this);
    }
    conversa(name, email) {
        this.props.navigator.push({
            screen: 'app9.conversas',
            title: name,
            overrideBackPress: true,
            passProps: {
                name, 
                email
            },
            previewActions: [{
                id: 'back'
            }]
        })

    }

    componentWillMount() {
        this.props.contatosUsuarioFetch();
        this.criarDataSource(this.props.contatos);
    }


    componentWillReceiveProps(nextProps) {
        this.criarDataSource(nextProps.contatos);
    }
    
    criarDataSource(contatos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.fonteDeDados = ds.cloneWithRows(contatos);
    }
    _onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            let rightButtons = [];
            if (Platform.OS === 'ios') {
                rightButtons = [
                    {
                        id: 'close',
                        title: 'Close',
                        icon: require('../imgs/cancelar.png')
                    }
                ]
            }
            this.props.newContato();
            this.props.navigator.showModal({
                screen: 'app9.cadastroContato',
                title: 'Cadastro de Contato',
                navigatorButtons: {
                    rightButtons
                }
            })
        }
    }
    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => <Row onPress={this.conversa}  {...data} />}
                    renderSectionHeader={() => <Header />}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    listView: {
        flex: 1,
        padding: 20,
        borderColor: '#CCC',
        borderBottomWidth: 1
    },
    txtNomeListView: {
        fontSize: 20,

    },
    txtEmailListView: {
        fontSize: 15
    }
})

const mapStateToProps = (state) => {
    const contatos = _.map(state.ListContatos || [], (val, uid) => {
        return { 
            ...val, uid 
        }
    });
    return {
        contatos
    };
}

export default connect(mapStateToProps, {
    newContato,
    contatosUsuarioFetch
})(Contato);

