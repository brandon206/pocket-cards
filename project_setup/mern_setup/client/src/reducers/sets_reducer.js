import types from '../actions/types';

 const DEFAULT_STATE = {
    category: "",
    categories: [],
    sets: [],
    topics: [],
    card: [],
    front_description: '',
    back_description: '',
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SEND_CREATE_CARD_DATA:
            console.log('create card reducer:', action);
            return {...state, front_description: action.payload.frontText, back_description: action.payload.backText}
        case types.GET_ALL_CARD_DATA:
            console.log("get all card data action:", action);
            return {...state, all_descriptions: action.payload.data.card}
        case types.GET_CARD_DATA:
            // return {...state, front_description: 'action.payload.data.card[0].frontText', back_description: action.payload.data.card[0].backText}
            return {...state, front_description: '', back_description: ''}
        case types.SEND_CARD_DATA:
            return{...state, front_description: '',back_description: ''}
        case types.GET_SETS_DATA:
            console.log('Sets Reducer: ', action);
            return {...state, topics: action.sets};
        case types.SORT_ALPHABETICAL:
            return {...state, categories: action.payload };
        case types.SORT_BY_LATEST:
            return {...state, categories: action.payload };  
        default:
            return state;
    }
} 