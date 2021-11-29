import {all, takeLatest, call, put, fork} from "redux-saga/effects";
import { setCookie } from "../utils/cookie";
import axios from "axios";
import { 
    registerSuccess, registerFailure, REGISTER_REQUEST,
    loginSuccess, loginFailure, LOGIN_REQUEST, 
    emailAuthFailure, emailAuthSuccess, EMAILAUTH_REQUEST,     
    tokenFailure, tokenSuccess, TOKEN_REQUEST, INFO_REQUEST, loadInfoFailure, loadInfoSuccess
    } from "../reducers/users";

async function registerAPI(data) {
    return await axios.post("/sign/register", data) && await axios.post("/sign/email", {email : data.email, redisKey : "VERIFY"});
}

function* register(action) {
    try {
        yield call(registerAPI, action.payload);
        yield put(registerSuccess());
    } catch (e) {
        yield put(registerFailure({msg: e.response.data.msg}));
    }
}

function emailAuthAPI(data) {
    return axios.post("/sign/verify", data);
}

function* emailAuth(action) {
    try {
        yield call(emailAuthAPI, action.payload)
        yield put(emailAuthSuccess());
    } catch(e) {
        yield put(emailAuthFailure({msg: e.response.data.msg}))
    }
}

function loginAPI(data) {
    return axios.post("/sign/login", data);
}

function* login(action) {
    try {
        const JWT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 30);
        const RFT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        
        const result = yield call(loginAPI, action.payload);
        const body = result.data.data;

        //console.log(body);
        //console.log(body.accessToken);

        setCookie('accessToken', body.accessToken, {path: "/", expires: JWT_EXPIRE_TIME}); 
        setCookie('refreshToken', body.refreshToken, {path: "/", expires: RFT_EXPIRE_TIME});
        yield put(loginSuccess({...body}));
    } catch(e) {
        yield put(loginFailure({msg: e.response.data.msg}))
    }
}

function tokenRequestAPI(data) {
    return axios.post("/sign/reissue", data)
}

function* tokenRequest(action) {
    try {
        const JWT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 30);
        const RFT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        const result = yield call(tokenRequestAPI, action.payload)
        const body = result.data.data;
        

        setCookie("accessToken", body.accessToken, {path: "/", expires: JWT_EXPIRE_TIME});
        setCookie('refreshToken', body.refreshToken, {path: "/", expires: RFT_EXPIRE_TIME});
        yield put(tokenSuccess({...body}));
    } catch(e) {
        yield put(tokenFailure({msg: e.response.data.msg}))
    }
}

export function infoRequestAPI(data) {
    return axios.post("/users/info",{data},
    {
        headers: {
            "X-AUTH-TOKEN": data.accessToken
        }
    })
}

function* infoRequest(action) {
    try {
        const result = yield call(infoRequestAPI, action.payload);
        const body = result.data.data;
        yield put(loadInfoSuccess({...body}));
    } catch(e) {
        yield put(loadInfoFailure);
    }
}

function* watchRegister() {
    yield takeLatest(REGISTER_REQUEST, register);
}

function* watchEmailAuth() {
    yield takeLatest(EMAILAUTH_REQUEST, emailAuth);
}
  
function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}

function* watchTokenRequest() {
    yield takeLatest(TOKEN_REQUEST, tokenRequest);
}

function* watchInfoRequest() {
    yield takeLatest(INFO_REQUEST, infoRequest);
}

export default function* usersSuga() {
    yield all([
        fork(watchRegister),
        fork(watchEmailAuth),
        fork(watchLogin),
        fork(watchTokenRequest),
        fork(watchInfoRequest)
    ]);
};