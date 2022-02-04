import React from "react";
import FindPassword from "../Components/Signup/FindPassword";
import styled from "styled-components";

const FindPasswordWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 30vw;
  max-width: 40vw;
  form {
    display: flex;
    flex-direction: column;
    .inputBlock {
      margin-bottom: 1rem;
    }
    .verifyBtn {
      border: 0;
      border-radius: 5px;
      background: #ffc107;
      padding: .5rem 0;
      color: white;
      font-size: 1.2rem;
      font-weight: bolder;
      transition: all 0.2s linear; 
      &:hover {
        cursor: pointer;
        background-color: #0049AF;
        transition: all 0.2s linear; 
      }
    }
  }
`;

const FindPasswordPage = () => {
  return (
    <FindPasswordWrapper>
      <FindPassword />
    </FindPasswordWrapper>
  );
};

export default FindPasswordPage;
