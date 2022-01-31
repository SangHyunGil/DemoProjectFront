import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { changepassword } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

const ChangePasswordFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 20px;
  }
  ul {
    list-style: none;
    align-self: flex-start;
    padding: 0;
    li {
      &:first-child {
        color: #FF7300;
      }
      &:last-child {
        span {
          color: #FF7300;
        }
      }
    }
  }
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%), 0 10px 10px -5px rgb(0 0 0 / 4%);
  margin: 0 auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ChangePasswordPageStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: red;
    align-self: flex-start;
  }
  & > div {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > div {
      width: 60vw;
      max-width: 50ch;
    }
  }
  button {
    background-color: #0049AF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    width: 60vw;
    max-width: 50ch;
  }
`;

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const myInfoData = queryClient.getQueryData("loadMyInfo");

  const changePasswordMutation = useMutation(
    ["changePassword"],
    (data) => changepassword(data, getCookie("accessToken")),
    {
      onSuccess: () => {
        navigate("/logout");
      },
    }
  );

  const onSubmit = (data) => {
    if (window.confirm("변경하시겠습니까?")) {
      console.log(data);
      changePasswordMutation.mutate({
        email: myInfoData.data.data.email,
        password: data.newPassword,
      });
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    }
  };

  return (
    <ChangePasswordFormWrapper>
      <h3>비밀번호 변경하기</h3>
      <ul>
        <li>다른 아이디/사이트에서 사용한적 없는 비밀번호</li>
        <li><span>가급적 이전에 사용한 적 없는 비밀번호</span>가 안전합니다.</li>
      </ul>
      <ChangePasswordPageStyle onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            id="outlined-required"
            label="새로운 비밀번호"
            {...register("newPassword", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "비밀번호는 최소 8자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.",
              },
            })}
            type="password"
          />
          <ErrorMessage
            errors={errors}
            name="newPassword"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <TextField
            id="outlined-reenter-password"
            label="비밀번호 확인"
            {...register("confirmPassword", {
              required: "비밀번호 입력 확인이 필요합니다!",
              validate: (value) =>
                value === password.current || "비밀번호가 일치하지 않습니다!",
            })}
            type="password"
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <p>{message}</p>}
          />
        </div>

        <button type="submit">변경하기</button>
      </ChangePasswordPageStyle>
    </ChangePasswordFormWrapper>
  );
};

export default ChangePasswordPage;
