import produce from "immer";

export const initialState = {
    id : 0,
    email : "",
    password : "",
    nickname : "",
    department : "",
    isLogin : false,
    isChecked : false,

    registerLoading : false,
    registerDone : false,
    registerError : "",

    loginLoading : false,
    loginDone : false,
    loginError : "",

    emailAuthSuccess : false,
    emailAuthError : "",

    tokenDone : false,
    tokenError : "",
}

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_STATE = "CLEAR_REGISTER_STATE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE"

export const EMAILAUTH_REQUEST = "EMAILAUTH_REQUEST";
export const EMAILAUTH_SUCCESS = "EMAILAUTH_SUCCESS";
export const EMAILAUTH_FAILURE = "EMAILAUTH_FAILURE";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILURE = "TOKEN_FAILURE";

export const INFO_REQUEST = "INFO_REQUEST";
export const INFO_SUCCESS = "INFO_SUCCESS";
export const INFO_FAILURE = "INFO_FAILURE";

export const HAS_NO_TOKEN = "HAS_NO_TOKEN";

export const registerRequest = (payload) => ({
    type : REGISTER_REQUEST,
    payload
});

export const registerSuccess = (payload) => ({
    type : REGISTER_SUCCESS,
});

export const registerFailure = (payload) => ({
    type : REGISTER_FAILURE,
    payload
})

export const clearRegisterState = () => ({
    type : CLEAR_REGISTER_STATE,
});

export const emailAuthRequest = (payload) => ({
    type : EMAILAUTH_REQUEST,
    payload
});

export const emailAuthSuccess = (payload) => ({
    type : EMAILAUTH_SUCCESS,
});

export const emailAuthFailure = (payload) => ({
    type : EMAILAUTH_FAILURE,
    payload
})

export const loginRequest = (payload) => ({
    type : LOGIN_REQUEST,
    payload
});

export const loginSuccess = (payload) => ({
    type : LOGIN_SUCCESS,
    payload,
})

export const loginFailure = (payload) => ({
    type : LOGIN_FAILURE,
    payload
})

export const clearLoginState = () => ({
    type : CLEAR_LOGIN_STATE
})

export const loadInfoRequest = (payload) => ({
    type : INFO_REQUEST,
    payload
})

export const loadInfoSuccess = (payload) => ({
    type : INFO_SUCCESS,
    payload
})

export const loadInfoFailure = () => ({
    type : INFO_FAILURE,
})

export const tokenRequest = (payload) => ({
    type : TOKEN_REQUEST,
    payload
});

export const tokenSuccess = (payload) => ({
    type : TOKEN_SUCCESS,
    payload
})

export const tokenFailure = (payload) => ({
    type : TOKEN_FAILURE,
    payload
})

export const hasNoToken = () => ({
    type : HAS_NO_TOKEN,
})

const reducer = (state = initialState, action) => 
    produce(state, (draft) => {
        switch (action.type) {
            case REGISTER_REQUEST:
                draft.registerLoading = true;
                draft.registerDone = false;
                break;

            case REGISTER_SUCCESS:
                draft.registerLoading = false;
                draft.registerDone = true;
                break;

            case REGISTER_FAILURE:
                draft.registerLoading = false;
                draft.registerError = action.payload.msg;
                break;

            case CLEAR_REGISTER_STATE:
                draft.registerLoading = false;
                draft.registerDone = false;
                draft.registerError = "";
                break;

            case EMAILAUTH_REQUEST:
                draft.emailAuthSuccess = false;
                draft.emailAuthError = null;
                break;

            case EMAILAUTH_SUCCESS:
                draft.emailAuthSuccess = true;
                draft.emailAuthError = null;
                break;

            case EMAILAUTH_FAILURE:
                draft.emailAuthSuccess = false;
                draft.emailAuthError = action.payload.msg;
                break;

            case LOGIN_REQUEST:
                draft.loginLoading = true;
                draft.loginDone = false;
                break;

            case LOGIN_SUCCESS:
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.isLogin = true;
                draft.isChecked = true;
                break;
            
            case LOGIN_FAILURE:
                draft.loginLoading = false;
                draft.loginError = action.payload.msg;
                break;

            case CLEAR_LOGIN_STATE:
                draft.loginLoading = false;
                draft.loginDone = false;
                draft.loginError = "";
                break;

            case TOKEN_REQUEST:
                draft.tokenDone = false;
                draft.tokenError = "";
                break;

            case TOKEN_SUCCESS:
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.tokenDone = true;
                draft.tokenError = "";
                draft.isLogin = true;
                draft.isChecked = true;
                break;
            
            case TOKEN_FAILURE:
                draft.tokenDone = false;
                draft.tokenError = action.payload.msg;
                break;
            
            case INFO_REQUEST:
                break;

            case INFO_SUCCESS:
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.nickname = action.payload.nickname;
                draft.department = action.payload.department;
                draft.isLogin = true;
                draft.isChecked = true;
                break;

            case INFO_FAILURE:
                break;

            case HAS_NO_TOKEN:
                draft.isChecked = true;
                break;

            default:
                break;
        }
    });

export default reducer;