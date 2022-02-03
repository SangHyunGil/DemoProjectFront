import React from "react";
import Main from "../Components/Main/Main"
import styled from "styled-components";

const Footer = styled.footer`
  height: 10vh;
  background: rgb(48, 55, 64);
  img {
    width: 10%;
  }
`;

const MainPage = () => {
  return (
    <>
      <Main />
      <Footer>
        <p>&copy;Koner.ALL RIGHTS RESERVED</p>
        <a href='/' ><img src="https://koner-bucket.s3.ap-northeast-2.amazonaws.com/logo/KakaoTalk_20220128_143615435.png" alt="main-logo" /></a>
      </Footer>
    </>
  ); 
};

export default MainPage;