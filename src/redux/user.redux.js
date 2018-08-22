
import axios from 'axios'
import { getRedirectPath } from '../utils'
// action
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'


const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}
// reducer
export function user(state=initState, action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, msg: action.msg}
        default:
            return state
    }
}

// action creator
export function loadData(userinfo){
    return {type: LOAD_DATA, payload: userinfo}
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update', data)
            .then(res=>{
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
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
                    dispatch(authSuccess(res.data.data))
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
                    dispatch(authSuccess({user, pwd, type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
function authSuccess(data) {
    const {pwd, ...info} = data
    return {type:AUTH_SUCCESS, payload:info}
}

function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}
