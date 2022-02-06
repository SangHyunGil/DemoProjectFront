import React from "react";
import Main from "../Components/Main/Main";
import styled from "styled-components";

const Footer = styled.footer`
  height: 10vh;
  background: rgb(48, 55, 64);
  display: flex;
  align-items: center;
  padding: 0 5rem;
  color: white;
  a {  
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      width: 200px;
    }
  }
  @media (max-width: 630px) {
    flex-direction: column;
    padding: 1rem 0
  }
`;

const MainPage = () => {
  return (
    <>
      <Main />
      <Footer>
        <p>&copy;Koner.ALL RIGHTS RESERVED</p>
        <a href="/">
          <img
            src="https://koner-bucket.s3.ap-northeast-2.amazonaws.com/logo/KakaoTalk_20220128_143615435.png"
            alt="main-logo"
          />
        </a>
      </Footer>
    </>
  );
};

export default MainPage;
