import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";

import {
  clearFindPasswordState,
  findPasswordRequest,
} from "../../reducers/users";

function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { findPasswordLoading, findPasswordDone, findPasswordError } =
    useSelector((state) => state.users);

  useEffect(() => {
    if (!findPasswordDone) return;
    navigate("/signup/complete", { replace: false });
    dispatch(clearFindPasswordState());
  }, [findPasswordDone]);

  const handleFindpassword = (data) => {
    dispatch(
      findPasswordRequest({
        email: data.email,
      })
    );
  };

  return (
    <>
      {findPasswordError === "" ? null : <p> {findPasswordError} </p>}
      <form onSubmit={handleSubmit(handleFindpassword)}>
        <div className="inputBlock">
          <TextField
            fullWidth
            variant="standard"
            label="이메일"
            name="Email"
            {...register("email", { required: "이메일을 입력해 주세요" })}
            type="text"
            InputProps = {{
                endAdornment: <InputAdornment position="end">@koreatech.ac.kr</InputAdornment>
            }}
          ></TextField>
          <p style={{color:'red'}}>{errors?.email?.message}</p>
        </div>

        {findPasswordLoading ? (
          <CircularProgress />
        ) : (
          <button className="verifyBtn" type="submit">이메일 인증</button>
        )}
      </form>
    </>
  );
}

export default SignUp;
