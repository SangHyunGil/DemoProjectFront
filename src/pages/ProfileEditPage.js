import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { findUserBoard } from "../Api/Api";
import { getCookie } from "../utils/cookie";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ProfileEditWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    padding: 1rem 2rem;
    width: 30vw;
    @media (max-width: 780px) {
        width: 80vw;
    }
    header {
        .HeaderTextContainer {
            display: flex;
            justify-content: space-between;
            a {
                text-decoration: none;
                color: black;
                &:hover {
                    font-weight: bolder;
                }
            }
        }
        margin-bottom: 2rem;
    }
`;

const ProfileEditFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfileEditFormButton = styled(Button)`
    width: 100%;
    color: white;
    background-color: #0049AF !important;
    border-radius: 5px;
    transition: all 0.3s linear;
    &:hover {
        background-color: #FFC107 !important;
        transition: all 0.3s linear;
    }
`;

function ProfileEditPage() {
  const queryClient = useQueryClient();
  const myinfoData = queryClient.getQueryData("loadMyInfo");
  const { register, handleSubmit, setValue } = useForm();
  console.log(myinfoData);
  const [myInfo, setMyInfo] = useState(myinfoData?.data?.data);

  const { data: tempMyInfoData } = useQuery(
    ["ProfileEditPageMyInfo"],
    () => findUserBoard(getCookie("accessToken")),
    {
      enabled: !!!myinfoData,
      onSuccess: (data) => {
        setMyInfo(data?.data?.data);
      },
    }
  );

  useEffect(() => {
    if (!!myInfo) {
      setValue("nickname", myInfo.nickname);
    }
  }, [myInfo, setValue]);

  return (
    <ProfileEditWrapper>
      <header>
          <div className="HeaderTextContainer">
              <h2>프로필 수정</h2>
              <Link to='/profile/accountInfo'>내 프로필</Link>
          </div>
          <p>내 프로필을 수정해 볼까요?</p>
      </header>
      <ProfileEditFormStyle>
        <FormControl disabled sx={{ m: 1 }} fullWidth>
          <InputLabel htmlFor="outlined-adornment-email">이메일</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            label="이메일"
            value={`${myInfo?.email}@koreatech.ac.kr`}
          />
        </FormControl>
        <FormControl sx={{ m: 2 }} fullWidth>
          <InputLabel htmlFor="outlined-adornment-nickname">닉네임</InputLabel>
          <OutlinedInput
            {...register("nickname", { value: " " })}
            id="outlined-adornment-nickname"
            label="닉네임"
          />
        </FormControl>
        <FormControl sx={{ m: 2 }} fullWidth>
          <Select value={myInfo?.department} {...register("department")}>
            <MenuItem value="기계공학부">기계공학부</MenuItem>
            <MenuItem value="전기전자통신공학부">전기전자통신공학부</MenuItem>
            <MenuItem value="디자인,건축공학부">디자인,건축공학부</MenuItem>
            <MenuItem value="메카트로닉스공학부">메카트로닉스공학부</MenuItem>
            <MenuItem value="산업경영학부">산업경영학부</MenuItem>
            <MenuItem value="에너지신소재화학공학부">
              에너지신소재화학공학부
            </MenuItem>
            <MenuItem value="컴퓨터공학부">컴퓨터공학부</MenuItem>
          </Select>
        </FormControl>
        <ProfileEditFormButton fullWidth variant="contained">저장</ProfileEditFormButton>
      </ProfileEditFormStyle>
    </ProfileEditWrapper>
  );
}

export default ProfileEditPage;
