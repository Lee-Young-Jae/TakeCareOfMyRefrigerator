import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageCommonStyle from "../Components/layout/PageCommonStyle";
import LabeledInput from "../Components/Patterns/LabeledInput";
import { USER_SIGNUP_REQUEST } from "../modules/reducers/user";
import Dialog from "../Components/common/Dialog";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const SignUpStyle = styled(PageCommonStyle)``;
const ButtonStyle = styled(Button)`
  animation: ${slideUp} 0.5s ease-in-out;
`;

const SignUp = () => {
  const [showOriginalPassword, setShowOriginalPassword] = useState({
    password: false,
    AgainPassword: false,
  });

  const [signUpInformation, setSignUpInformation] = useState({
    id: "",
    password: "",
    againPassword: "",
    nickname: "",
  });

  const onChangeSignUpInformation = useCallback(
    (e) => {
      const { id, value } = e.target;
      setSignUpInformation({
        ...signUpInformation,
        [id]: value,
      });
    },
    [signUpInformation]
  );

  const OnClickOriginalPassword = useCallback(
    (event) => {
      if (event.target.id === "showPasswordCheckBox") {
        setShowOriginalPassword({
          ...showOriginalPassword,
          password: !showOriginalPassword.password,
        });
        return;
      }

      setShowOriginalPassword({
        ...showOriginalPassword,
        AgainPassword: !showOriginalPassword.AgainPassword,
      });
    },
    [showOriginalPassword]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpDone, signUpError } = useSelector((state) => state.user.state);

  useEffect(() => {
    if (signUpDone) {
      setDialog(true);
      setDialogMessage("회원가입이 완료되었습니다😊");
    }
    if (signUpError) {
      setDialog(true);
      setDialogMessage(signUpError + "😥");
    }
  }, [signUpDone, signUpError, navigate]);

  const onClickSignUpButton = () => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
      data: {
        loginId: signUpInformation.id,
        password: signUpInformation.password,
        nickname: signUpInformation.nickname,
      },
    });
  };

  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const onConfirm = () => {
    setDialog(false);

    if (signUpDone) {
      navigate("/login");
    }
  };

  const onCancel = () => {
    setDialog(false);
  };

  return (
    <SignUpStyle>
      <LabeledInput
        inputName="id"
        labelText="사용할 아이디"
        autoComplete="off"
        pattern="[A-Za-z0-9]+"
        value={signUpInformation.id}
        onChange={onChangeSignUpInformation}
        animation
      ></LabeledInput>
      {signUpInformation.id?.length >= 3 && (
        <LabeledInput
          inputName="password"
          labelText="비밀번호"
          inputType={showOriginalPassword.password ? "text" : "password"}
          autoComplete="off"
          onChange={onChangeSignUpInformation}
          animation
        >
          <label htmlFor="showPasswordCheckBox">보기</label>
          <input
            id="showPasswordCheckBox"
            type="checkbox"
            onClick={OnClickOriginalPassword}
          ></input>
        </LabeledInput>
      )}
      {signUpInformation.password?.length >= 3 && (
        <LabeledInput
          inputName="againPassword"
          labelText="비밀번호 확인"
          autoComplete="off"
          inputType={showOriginalPassword.AgainPassword ? "text" : "password"}
          onChange={onChangeSignUpInformation}
          animation
        >
          <label htmlFor="showAgainPasswordCheckBox">보기</label>
          <input
            id="showAgainPasswordCheckBox"
            type="checkbox"
            onClick={OnClickOriginalPassword}
          ></input>
        </LabeledInput>
      )}
      {signUpInformation.againPassword?.length >= 3 &&
        signUpInformation.againPassword === signUpInformation.password && (
          <LabeledInput
            inputName="nickname"
            labelText="닉네임"
            autoComplete="off"
            onChange={onChangeSignUpInformation}
            animation
          ></LabeledInput>
        )}

      {signUpInformation.nickname?.length >= 2 && (
        <ButtonStyle fullWidth onClick={onClickSignUpButton}>
          회원가입
        </ButtonStyle>
      )}
      <Dialog
        onlyConfirm
        title="내 냉장고를 부탁해"
        visible={dialog}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        {dialogMessage}
      </Dialog>
    </SignUpStyle>
  );
};

export default SignUp;
