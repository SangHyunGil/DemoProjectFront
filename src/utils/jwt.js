import { getCookie } from './cookie';
import { loadInfoRequest, tokenRequest, hasNoToken, reLoginSuccess } from '../reducers/users';
import { useSelector } from "react-redux";
/**
 * 1. 쿠키에서 RefreshToken 꺼냄
 * 2. RefreshToken 있는지 확인
 * 3. 존재한다면 유저 정보 로드 및 토큰 재발행 및 로그인 성공 Dispatch
 * 4. 존재하지 않는다면 로그인 실패 Dispatch
 * @param {*} dispatch 
 */

export const checkRefreshToken = (dispatch) => {
    const refreshToken = getCookie("refreshToken");

    if (refreshToken) {
      dispatch(tokenRequest({
        refreshToken : refreshToken
      })) 
    } else {
      console.log('No Token!');
      dispatch(hasNoToken())
    }
}

/**
 * 1. 쿠키에서 AccessToken 꺼냄
 * 2. AccessToken 존재하는지 확인
 * 3. 존재한다면 유저 정보 로드 및 로그인 성공 Dispatch
 * 4. 존재하지 않는다면 RefreshToken 확인 메소드 호출
 * @param {*} dispatch 
 */
export const checkAccessToken = (dispatch) => {
    const accessToken = getCookie("accessToken");
    
    if (accessToken) {
      dispatch(loadInfoRequest({
        accessToken : accessToken
      }));
    } else {
      checkRefreshToken(dispatch);
    }
}