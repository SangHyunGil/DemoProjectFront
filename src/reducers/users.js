import produce from "immer";

export const initialState = {
    id : 0,
    email : "",
    password : "",
    nickname : "",
    department : "",
    accessToken : "",
    isLogin : false,
    isChecked : false,
    studyInfos : [],

    registerLoading : false,
    registerDone : false,
    registerError : "",

    findPasswordLoading : false,
    findPasswordDone : false,
    findPasswordError : "",

    loginLoading : false,
    loginDone : false,
    loginError : "",

    changePasswordLoading : false,
    changePasswordDone : false,
    changePasswordError : "",

    emailAuthSuccess : false,
    emailAuthError : "",

    tokenDone : false,
    tokenError : "",

    changUserInfoLoading : false,
    changeUserInfoDone : false,
    changeUserInfoError : ""
}

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_STATE = "CLEAR_REGISTER_STATE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";
export const LOGOUT = "LOGOUT";

export const EMAILAUTH_REQUEST = "EMAILAUTH_REQUEST";
export const EMAILAUTH_SUCCESS = "EMAILAUTH_SUCCESS";
export const EMAILAUTH_FAILURE = "EMAILAUTH_FAILURE";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILURE = "TOKEN_FAILURE";

export const INFO_REQUEST = "INFO_REQUEST";
export const INFO_SUCCESS = "INFO_SUCCESS";
export const INFO_FAILURE = "INFO_FAILURE";

export const FINDPASSWORD_REQUEST = "FINDPASSWORD_REQUEST";
export const FINDPASSWORD_SUCCESS = "FINDPASSWORD_SUCCESS";
export const FINDPASSWORD_FAILURE = "FINDPASSWORD_FAILURE";
export const CLEAR_FINDPASSWORD_STATE = "CLEAR_FINDPASSWORD_STATE";

export const CHANGEPASSWORD_REQUEST = "CHANGEPASSWORD_REQUEST";
export const CHANGEPASSWORD_SUCCESS = "CHANGEPASSWORD_SUCCESS";
export const CHANGEPASSWORD_FAILURE = "CHANGEPASSWORD_FAILURE";

export const HAS_NO_TOKEN = "HAS_NO_TOKEN";

export const CHANGEUSERINFO_REQEUST = "CHANGEUSERINFO_REQEUST";
export const CHANGEUSERINFO_SUCCESS = "CHANGEUSERINFO_SUCCESS";
export const CHANGEUSERINFO_FAILURE = "CHANGEUSERINFO_FAILURE";
export const CLEAR_CHANGEUSERINFO_STATE = "CLEAR_CHANGEUSERINFO_STATE";

export const UPDATE_STUDY_IDS = "UPDATE_STUDY_IDS";

export const registerRequest = (payload) => ({
    type : REGISTER_REQUEST,
    payload
});

export const registerSuccess = () => ({
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

export const emailAuthSuccess = () => ({
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

export const findPasswordRequest = (payload) => ({
    type : FINDPASSWORD_REQUEST,
    payload
})

export const findPasswordSuccess = () => ({
    type : FINDPASSWORD_SUCCESS
})

export const findPasswordFailure = (payload) => ({
    type : FINDPASSWORD_FAILURE,
    payload
})

export const clearFindPasswordState = () => ({
    type : CLEAR_FINDPASSWORD_STATE,
});

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

export const changePasswordRequest = (payload) => ({
    type : CHANGEPASSWORD_REQUEST,
    payload
})

export const changePasswordSuccess = () => ({
    type : CHANGEPASSWORD_SUCCESS
})

export const changePasswordFailure = (payload) => ({
    type : CHANGEPASSWORD_FAILURE,
    payload
})

export const hasNoToken = () => ({
    type : HAS_NO_TOKEN,
})

export const changeUserInfoRequest = (payload) => ({
    type : CHANGEUSERINFO_REQEUST,
    payload
})

export const changeUserInfoSuccess = (payload) => ({
    type : CHANGEUSERINFO_SUCCESS,
    payload
})

export const changeUserInfoFailure = (payload) => ({
    type : CHANGEUSERINFO_FAILURE,
    payload
})

export const clearChangeUserInfoState = () => ({
    type : CLEAR_CHANGEUSERINFO_STATE
});

export const logOut = () => ({
    type : LOGOUT
});

export const updateStudyIds = (payload) => ({
    type : UPDATE_STUDY_IDS,
    payload    
});

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
                draft.loginDone = false;
                break;

            case LOGIN_SUCCESS:
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.nickname = action.payload.nickname;
                draft.department = action.payload.department;
                draft.accessToken = action.payload.accessToken;
                draft.studyIds = action.payload.studyIds;
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.isLogin = true;
                draft.isChecked = true;
                break;
            
            case LOGIN_FAILURE:
                draft.loginLoading = false;
                draft.loginDone = false;
                draft.loginError = action.payload.msg;
                break;

            case CLEAR_LOGIN_STATE:
                draft.loginLoading = false;
                draft.loginDone = false;
                draft.loginError = "";
                break;
            //전체 초기화
            case LOGOUT:
                draft.id = "";
                draft.email = "";
                draft.nickname = "";
                draft.department = "";
                draft.accessToken = "";
                draft.isLogin = false;
                draft.isChecked = false;
                break;

            case TOKEN_REQUEST:
                draft.tokenDone = false;
                draft.tokenError = "";
                break;

            case TOKEN_SUCCESS:
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.nickname = action.payload.nickname;
                draft.department = action.payload.department;
                draft.accessToken = action.payload.accessToken;
                //study list
                console.log(action.payload.studyIds); 
                draft.studyIds = action.payload.studyIds;
                console.log(draft.studyIds);
                draft.tokenDone = true;
                draft.tokenError = "";
                draft.isLogin = true;
                draft.isChecked = true;
                break;
            
            case TOKEN_FAILURE:
                draft.tokenDone = false;
                draft.tokenError = action.payload.msg;
                draft.isChecked = true;
                break;
            
            case INFO_REQUEST:
                break;

            case INFO_SUCCESS:
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.nickname = action.payload.nickname;
                draft.department = action.payload.department;
                draft.accessToken = action.payload.accessToken;
                //study list
                draft.studyInfos = action.payload.studyInfos;
                draft.isLogin = true;
                draft.isChecked = true;
                break;

            case INFO_FAILURE:
                draft.isChecked = true;
                break;

            case FINDPASSWORD_REQUEST:
                draft.findPasswordLoading = true;
                draft.findPasswordDone = false;
                draft.findPasswordError = "";
                break;

            case FINDPASSWORD_SUCCESS:
                draft.findPasswordLoading = false;
                draft.findPasswordDone = true;
                draft.findPasswordError = "";
                break;

            case FINDPASSWORD_FAILURE:
                draft.findPasswordLoading = false;
                draft.findPasswordDone = true;
                draft.findPasswordError = action.payload.msg;
                break;
            
            case CLEAR_FINDPASSWORD_STATE:
                draft.findPasswordLoading = false;
                draft.findPasswordDone = false;
                draft.findPasswordError = "";
                break;
            
            case CHANGEPASSWORD_REQUEST:
                draft.changePasswordLoading = true;
                draft.changePasswordDone = false;
                draft.changePasswordError = "";
                break;

            case CHANGEPASSWORD_SUCCESS:
                draft.changePasswordLoading = false;
                draft.changePasswordDone = true;
                draft.changePasswordError = "";
                break;

            case CHANGEPASSWORD_FAILURE:
                draft.changePasswordLoading = false;
                draft.changePasswordDone = false;
                draft.changePasswordError = action.payload.msg;
                break;

            case HAS_NO_TOKEN:
                draft.isChecked = true;
                break;
            
            case CHANGEUSERINFO_REQEUST:
                draft.changUserInfoLoading = true;
                draft.changeUserInfoDone = false;
                draft.changeUserInfoError = "";
                break;

            case CHANGEUSERINFO_SUCCESS:
                draft.changUserInfoLoading = false;
                draft.changeUserInfoDone = true;
                draft.changeUserInfoError = "";
                draft.nickname = action.payload.nickname;
                draft.department = action.payload.department;
                break;

            case CHANGEUSERINFO_FAILURE:
                draft.changUserInfoLoading = false;
                draft.changeUserInfoDone = false;
                draft.changeUserInfoError = action.payload.msg;
                break;

            case CLEAR_CHANGEUSERINFO_STATE:
                draft.changUserInfoLoading = false;
                draft.changeUserInfoDone = false;
                draft.changeUserInfoError = "";
                break;
            
            case UPDATE_STUDY_IDS:
                //console.log(action.payload);
                draft.studyInfos = [...draft.studyInfos, action.payload];
                break;

            default:
                return state;
        }
    });

export default reducer;