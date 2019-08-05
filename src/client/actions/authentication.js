import axios from 'axios';
import{
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
}from './ActionTypes';

export function registerRequest(user_id, user_pw){
    return(dispatch) => {
        dispatch(register());
        return axios.post('/api/memberJoin/signup', {user_id, user_pw})
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register(){
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess(){
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(){
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

export function loginRequest(user_id, user_pw){
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/memberLogin/signin', {user_id, user_pw})
        .then((response) => {
            console.log("react: login 성공 확인");
            dispatch(loginSuccess(user_id));
        }).catch((error) => {
            dispatch(loginFailure());
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(user_id){
    return {
        type: AUTH_LOGIN_SUCCESS,
        user_id
    };
}

export function loginFailure(){
    return {
        type: AUTH_LOGIN_FAILURE
    };
}