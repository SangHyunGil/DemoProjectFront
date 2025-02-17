import {all, takeLatest, call, put, fork} from "redux-saga/effects";
import { setCookie } from "../utils/cookie";
import axios from "axios";
import { 
    registerSuccess, registerFailure, REGISTER_REQUEST,
    loginSuccess, loginFailure, LOGIN_REQUEST, 
    emailAuthFailure, emailAuthSuccess, EMAILAUTH_REQUEST,     
    tokenFailure, tokenSuccess, TOKEN_REQUEST, INFO_REQUEST, loadInfoFailure, loadInfoSuccess, FINDPASSWORD_REQUEST, findPasswordFailure, findPasswordSuccess, CHANGEPASSWORD_REQUEST, changePasswordFailure, changePasswordSuccess, CHANGEUSERINFO_REQEUST, changeUserInfoFailure, changeUserInfoSuccess
    } from "../reducers/users";

async function registerAPI(data) {
    return await axios.post("/api/sign/register", data, {"Content-Type": "multipart/form-data"}) && await axios.post("/api/sign/email", {email : data.get('email'), redisKey : "VERIFY"});
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
    return axios.post("/api/sign/verify", data);
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
    return axios.post("/api/sign/login", data);
}

function* login(action) {
    try {
        const JWT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 30);
        const RFT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        
        const result = yield call(loginAPI, action.payload);
        const body = result.data.data;
        body.password = action.payload.password;
        setCookie('accessToken', body.accessToken, {path: "/", expires: JWT_EXPIRE_TIME});
        setCookie('refreshToken', body.refreshToken, {path: "/", expires: RFT_EXPIRE_TIME});
        yield put(loginSuccess({...body}));
    } catch(e) {
        yield put(loginFailure({msg: e.response.data.msg}))
    }
}

function tokenAPI(data) {
    return axios.post("/api/sign/reissue", data)
}

function* token(action) {
    try {
        const JWT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 30);
        const RFT_EXPIRE_TIME = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        const result = yield call(tokenAPI, action.payload)
        const body = result.data.data;

        setCookie("accessToken", body.accessToken, {path: "/", expires: JWT_EXPIRE_TIME});
        setCookie('refreshToken', body.refreshToken, {path: "/", expires: RFT_EXPIRE_TIME});
        yield put(tokenSuccess({...body}));
    } catch(e) {
        yield put(tokenFailure({msg: e.response.data.msg}))
    }
}

export function infoAPI(data) {
    return axios.post("/api/users/info",{},
    {
        headers: {
            "X-AUTH-TOKEN": data.accessToken
        }
    })
}

function* info(action) {
    try {
        const result = yield call(infoAPI, action.payload);
        const body = result.data.data;
        yield put(loadInfoSuccess({...body, accessToken : action.payload.accessToken}))
    } catch(e) {
        yield put(loadInfoFailure())
    }
}

function findPasswordAPI(data) {
    return axios.post("/api/sign/email", {email : data.email, redisKey : "PASSWORD"})
}

function* findPassword(action) {
    try {
        yield call(findPasswordAPI, action.payload);
        yield put(findPasswordSuccess());
    } catch (e) {
        yield put(findPasswordFailure({msg: e.response.data.msg}));
    }
}

function changePasswordAPI(data) {
    return axios.post("/api/users/password", {email : data.email, password : data.password});
}

function* changePassword(action) {
    try {
        yield call(changePasswordAPI, action.payload)
        yield put(changePasswordSuccess());
    } catch(e) {
        yield put(changePasswordFailure({msg: e.response.data.msg}));
    }
}

function changeUserInfoAPI(data) {
    const {id, accessToken, ...temp} = data

    return axios.put("/api/users/"+id, temp, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    })
}

function* changeUserInfo(action) {
    try {
        const result = yield call(changeUserInfoAPI, action.payload);
        const body = result.data.data;
        //console.log(body);
        yield put(changeUserInfoSuccess({...body}))
    } catch(e) {
        yield put(changeUserInfoFailure({msg: e.response.data.msg}));
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
    yield takeLatest(TOKEN_REQUEST, token);
}

function* watchInfoRequest() {
    yield takeLatest(INFO_REQUEST, info);
}

function* watchFindPasswordRequest() {
    yield takeLatest(FINDPASSWORD_REQUEST, findPassword);
}

function* watchChangePasswordRequest() {
    yield takeLatest(CHANGEPASSWORD_REQUEST, changePassword);
}

function* watchChangeUserInfoRequest() {
    yield takeLatest(CHANGEUSERINFO_REQEUST, changeUserInfo);
}

export default function* usersSuga() {
    yield all([
        fork(watchRegister),
        fork(watchEmailAuth),
        fork(watchLogin),
        fork(watchTokenRequest),
        fork(watchInfoRequest),
        fork(watchFindPasswordRequest),
        fork(watchChangePasswordRequest),
        fork(watchChangeUserInfoRequest)
    ]);
};