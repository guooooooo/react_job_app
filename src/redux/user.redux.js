
import axios from 'axios'
import { getRedirectPath } from '../utils'
// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'


const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
}
// reducer
export function user(state=initState, action){
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false}
        default:
            return state
    }
}

// action creator
export function loadData(userinfo){
    return {type: LOAD_DATA, payload: userinfo}
}

export function login(data){
    let {user, pwd} = data
    if (!user || !pwd) {
        return errorMsg('用户名密码不能为空')
    }
    return dispatch=>{
        axios.post('/user/login', {user, pwd})
            .then(res=>{
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register(data){
    let {user, pwd, repeatpwd, type} = data
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码不能为空')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register', {user, pwd, type})
            .then(res=>{
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user, pwd, type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
function registerSuccess(data) {
    return {type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
}
function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}
