import { Navigation } from 'react-native-navigation';
import FormCadxastro from '../FormCadastro/form-cadastro';
import FormLogin from '../FormLogin/form-login';
import Principal from '../Principal/principal';
import Contatos from '../Contatos/contatos';
import Conversas from '../Conversas/conversa';
import CadastroContatos from '../CadastroContatos/cadastro-contatos'
import { ScreenBoaVindas } from '../ScreenBoaVindas/screen-boa-vindas';
import Configuracao from '../Configuracao/configuracao';
import ListaContato from '../ListaConversa/list-conversa';

export default function registerScreens(store, Provider) {
    Navigation.registerComponent('app9.login', () => FormLogin, store, Provider);
    Navigation.registerComponent('app9.configuracao', () => Configuracao, store, Provider);
    Navigation.registerComponent('app9.cadastro', () => FormCadastro, store, Provider);
    Navigation.registerComponent('app9.bemvindo', () => ScreenBoaVindas, store, Provider);
    Navigation.registerComponent('app9.principal', () => Principal, store, Provider);
    Navigation.registerComponent('app9.contatos', () => Contatos, store, Provider);
    Navigation.registerComponent('app9.conversas', () => Conversas, store, Provider);
    Navigation.registerComponent('app9.cadastroContato',()=> CadastroContatos, store, Provider);
    Navigation.registerComponent('app9.listContato',()=> ListaContato, store, Provider);

}