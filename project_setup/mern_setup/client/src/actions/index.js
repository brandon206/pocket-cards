import axios from 'axios';
import types from './types';

function authHeaders(){
    return {
        headers: {
            authorization: localStorage.getItem('token')
        }
    }
}

export function userSignOut(){

    localStorage.removeItem("token");

    return {
        type: types.SIGN_OUT
    }
}


export function getProfileData () {
    const resp = axios.get('/api/userhome', authHeaders());

    console.log("this is the response from axios ", resp);
}

export function sortAlphabetical () {
    const resp = axios.get('/api/userhome', authHeaders());
    
    return {
        type: types.SORT_ALPHABETICAL,
        payload: resp
    }
}

//Vienna's
export function getSetsData (id){
    const resp = axios.get(`/api/set_management/${id}`, authHeaders());
    
    return{
        type: types.GET_SETS_DATA,
        payload: resp
    }
}

export function sortByLatest () {
    const resp = axios.get('/api/userhome', authHeaders());

    return {
        type: types.SORT_BY_LATEST,
        payload: resp
    }
}

export function getCardData(){
    const resp = axios.get(`/api/cards/1/topic/1`, authHeaders());

    return{
        type: types.GET_CARD_DATA,
        payload: resp
    }
}

export function userSignUp(newUser){
    return async function (dispatch){
        try {
            const { data: { token, user } } = await axios.post('/auth/sign-up', newUser);

            localStorage.setItem('token', token);

            dispatch({
                type: types.SIGN_UP,
                user
            });

        } catch (err){
            console.log('Sign Up Error:', err.response);
            dispatch ({
                type: types.SIGN_UP_ERROR,
                // error: "email address already exists"
            });
        }
    }
}

export function userSignIn(userInfo){
    return async function (dispatch){
        try {
            const { data: { token, user } } = await axios.post("/auth/sign-in",userInfo);
    
            localStorage.setItem('token', token);
    
            dispatch({
                type: types.SIGN_IN,
                user
            });
        } catch (err){
            dispatch({
                type: types.SIGN_IN_ERROR,
                // error: "Invalid email and/or password"
            });
        }
        
    }
}

export const userJwtSignIn = async dispatch => {
    try {
        const { data: { user } } = await axios.get('/auth/sign-in', authHeaders());

        dispatch({
            type: types.SIGN_IN,
            user
        });
    } catch(err){
        dispatch({
            type: types.SIGN_IN_ERROR
        });
    }
}

export function sendCardData(updatedFrontDescription){
    const resp = axios.patch(`/api/update_cards/1`, updatedFrontDescription);
    
    return {
        type: types.SEND_CARD_DATA,
        payload: resp
    }
}

export function getAllCardData(){
    const resp = axios.get(`/api/cards/1/topic/1`, authHeaders());

    return{
        type: types.GET_ALL_CARD_DATA,
        payload: resp
    }
}

//Vienna's
export function sendCategoryAndSubcategoryData(updatedCategory,updatedSubCategory){
    return async function(dispatch){
        const subcategoryCreationResponse = axios.post(`/api/set_management/create_category`, updatedCategory).then(categoryCreationResponse => {
            console.log('category and subcategory response:', categoryCreationResponse);
            updatedSubCategory.setID = categoryCreationResponse.data.data.insertId;
            return axios.post(`${BASE_URL}/set_management/create_subcategory`, updatedSubCategory)

        });
        return {
            type: types.SEND_CATEGORY_AND_SUBCATEGORY_DATA,
            payload: subcategoryCreationResponse
        }
    }
}

export function deleteCardData(ID){
    console.log("action param", ID)
    const resp = axios.post(`/api/set_management/delete_card`, ID);
    return{
        type: types.DELETE_CARD_DATA,
        payload: resp
    }
}

//Vienna's
export function sendCreateCardData(createCard){
    const resp = axios.post(`/api/set_management/create_card`,createCard);
    console.log("this is the response from axios for card creation", resp);
    return{
        type:types.CREATE_CARD_DATA,
        payload: resp
    }
}
