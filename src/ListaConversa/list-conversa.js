import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';
import {
    listaConversaUsuarioFetch
} from '../actions/app-action';
import {
    connect
} from 'react-redux';
import {
    Row
} from '../Rows/rows';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';

class ListaContato extends Component {
    constructor(props) {
        super(props);
        this.conversa = this.conversa.bind(this);
    }
    componentWillMount() {
        this.props.listaConversaUsuarioFetch();
        this._renderList(this.props.conversas);
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

    componentWillReceiveProps(nextProps) {
        this._renderList(nextProps.conversas);
    }

    _renderList(conversas) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(conversas)
    }
    render() {
        return(
            <View>
                <ListView 
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(data) => (<Row onPress={this.conversa} {...data} />)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const conversas = _.values(state.ListMensagemUsuario);
    return {
        conversas
    }
};

export default connect(mapStateToProps, {
    listaConversaUsuarioFetch
})(ListaContato);