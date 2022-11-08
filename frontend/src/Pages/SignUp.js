import React, { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Components/common/Button";

import PageCommonStyle from "../Components/layout/PageCommonStyle";
import LabeledInput from "../Components/Patterns/LabeledInput";

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
      {signUpInformation.id && (
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
      {signUpInformation.password && (
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
      {signUpInformation.againPassword && (
        <LabeledInput
          inputName="nickname"
          labelText="닉네임"
          autoComplete="off"
          onChange={onChangeSignUpInformation}
          animation
        ></LabeledInput>
      )}

      {signUpInformation.nickname && (
        <ButtonStyle fullWidth>회원가입</ButtonStyle>
      )}
    </SignUpStyle>
  );
};

export default SignUp;
