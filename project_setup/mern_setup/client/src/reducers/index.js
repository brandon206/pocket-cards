import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import setsReducer from './sets_reducer';
import cardReducer from './card_reducer';
import modalReducer from './modal_reducer';


const rootReducer = combineReducers ({
    user: userReducer,
    form: formReducer,
    sets:setsReducer,
    card: cardReducer,
    modal: modalReducer,
});

export default rootReducer;