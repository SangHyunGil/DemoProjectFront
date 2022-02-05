import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearChangeUserInfoState } from "../../reducers/users";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserProfileInfo, updateProfileInfo } from "../../Api/Api";
import styled from "styled-components";
import { getCookie } from "../../utils/cookie";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import DefaultProfileImg from "../DefaultProfileImg";
import { Link } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

const StyleProfileImgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 10%;
  min-width: 100px;
  img {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  }
`;

const ProfileImgAddButton = styled.label`
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  position: absolute;
  right: 5px;
  bottom: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  svg {
    margin: 0;
    &:hover {
      cursor: pointer;
      color: #0097e6;
      transition: color 0.3s ease-in-out;
    }
  }
`;

const ProfileFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileFormHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 10px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 80%;
  .HeaderTextWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .LinkWrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          font-weight: bolder;
        }
      }
    }
  }
  .HeaderMainWrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    .HeaderInfoWrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .nickName {
      font-size: 1.5rem;
      font-weight: bolder;
    }
  }
  @media (max-width: 420px) { 
    .HeaderTextWrapper,.HeaderMainWrapper {
      flex-direction: column;
      align-items: center;
      .LinkWrapper {
        margin-top: 1rem;
      }
    }
    .HeaderMainWrapper {
      .HeaderInfoWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;

const ProfileFormMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
`;

const Profile = () => {
  const { id, isChecked, isLogin, changeUserInfoDone, changeUserInfoError } =
    useSelector((state) => state.users);
  let navigate = useNavigate();
  const [backGroundImg, setbackGroundImg] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, data: myInfo } = useQuery(
    ["loadMyInfo"],
    () => getUserProfileInfo(id, getCookie("accessToken")),
    {
      select: (data) => data.data.data,
      onSuccess: (data) => {
        console.log(data);
        setbackGroundImg(data?.profileImgUrl);
      },
    }
  );

  const updateProfileInfoMutation = useMutation(
    ["updateProfileInfo", id],
    (data) => updateProfileInfo(data, id, getCookie("accessToken")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["loadMyInfo"]);
        setOpen(true);
      },
    }
  );

  const dispatch = useDispatch();

  const goLoginPage = () => {
    navigate("/", { replace: false });
  };

  useEffect(() => {
    if (isChecked && !isLogin) {
      goLoginPage();
    }
  }, [isLogin, isChecked]);

  useEffect(() => {
    console.log(changeUserInfoDone);
    if (!changeUserInfoDone) {
      return;
    }
    navigate("/", { replace: true });
    dispatch(clearChangeUserInfoState());
  }, [changeUserInfoDone]);

  const handleProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", myInfo.nickname);
    formData.append("department", myInfo.department);
    formData.append("email", myInfo.email);
    if (thumbnail) {
      formData.append("profileImg", thumbnail);
    }
    updateProfileInfoMutation.mutate(formData);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUpload = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setbackGroundImg(e.target.result);
      };
      reader.readAsDataURL(files[0]);
      setThumbnail(files[0]);
    }
  };

  return (
    <section style={{ height: "calc(100% - 108px)" }}>
      {changeUserInfoError === "" ? null : <p> {changeUserInfoError} </p>}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionUp}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          스터디 수정에 성공했습니다!.
        </Alert>
      </Snackbar>
      <ProfileFormStyle onSubmit={handleProfile}>
        <ProfileFormHeader>
          <div className="HeaderTextWrapper">
              <h2>프로필</h2>
              <div className="LinkWrapper">
                <Link to="/changepassword">비밀번호 변경하기</Link>
                <Link to='/profile/edit'>프로필 수정하기</Link>
              </div>
          </div>
          <div className="HeaderMainWrapper">
            <StyleProfileImgWrapper>
              {myInfo?.profileImgUrl === "디폴트이미지 경로" ? (
                <DefaultProfileImg isRandom={false} />
              ) : (
                <img src={backGroundImg} alt="profileImg" />
              )}
              <ProfileImgAddButton htmlFor="contained-button-file">
                <input
                  style={{ display: "none" }}
                  accept="image/*"
                  id="contained-button-file"
                  name="thumbNailImg"
                  type="file"
                  onChange={handleUpload}
                />
                <AddPhotoAlternateIcon sx={{ m: 2 }} />
              </ProfileImgAddButton>
            </StyleProfileImgWrapper>
            <div className="HeaderInfoWrapper">
                <p className="nickName">{myInfo?.nickname}</p>
                <p className="departMent">{myInfo?.department}</p>
                <p className="email">{myInfo?.email}@koreatech.ac.kr</p>
            </div>
          </div>
        </ProfileFormHeader>
        <ProfileFormMain>
        </ProfileFormMain>
        <button type="submit">수정하기</button>
      </ProfileFormStyle>
    </section>
  );
};

export default Profile;
