import { 
    LISTA_CONVERSAR_USUARIO 
} from '../actions/app-action-type';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_CONVERSAR_USUARIO: 
            return action.payload
        default :
            return state;
    }
}