import React from "react";
import styled from "styled-components";
import Button from "../Components/common/Button";
import LabeledInput from "../Components/Patterns/LabeledInput";

import PageCommonStyle from "../Components/layout/PageCommonStyle";
import { Link } from "react-router-dom";

const LoginStyle = styled(PageCommonStyle)``;

const StyleSocialLoginButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const StyleLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

const StyleLink = styled(Link)`
  margin: 0 1rem;
  color: ${({ color }) => {
    return color ? color : "black";
  }};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyleCenter = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0 0 0;
`;

const Login = () => {
  return (
    <LoginStyle>
      <form>
        <LabeledInput
          labelText="ID"
          inputName="id"
          autoComplete="off"
          pattern="[A-Za-z0-9]+"
        ></LabeledInput>
        <LabeledInput
          labelText="Password"
          inputName="pw"
          inputType="password"
        ></LabeledInput>
        <Button type="submit" size="large" fullWidth>
          로그인
        </Button>

        <StyleLinkWrapper>
          <StyleLink to="/404">아이디 찾기</StyleLink>
          <span> | </span>
          <StyleLink to="/404">비밀번호 찾기</StyleLink>
          <span> | </span>
          <StyleLink to="/signup">회원가입</StyleLink>
        </StyleLinkWrapper>

        <StyleCenter>소셜 계정 로그인</StyleCenter>

        <StyleSocialLoginButtonWrapper>
          <span>Naver</span>
          <span>Kakao</span>
          <span>Google</span>
          <span>Facebook</span>
          <span>Apple</span>
        </StyleSocialLoginButtonWrapper>
      </form>
    </LoginStyle>
  );
};

export default Login;
