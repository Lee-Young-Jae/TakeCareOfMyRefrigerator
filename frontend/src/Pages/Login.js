import React from "react";
import styled from "styled-components";
import Button from "../Components/common/Button";
import LabeledInput from "../Components/Patterns/LabeledInput";

import PageCommonStyle from "../Components/layout/PageCommonStyle";
import { Link } from "react-router-dom";

const LoginStyle = styled(PageCommonStyle)``;

const Login = () => {
  return (
    <LoginStyle>
      <form>
        <LabeledInput
          labelText="ID"
          inputName="id"
          autocomplte="off"
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

        <Link to="/signup">
          <span>회원가입</span>
        </Link>
        <span>카카오 로그인</span>
        <div></div>
      </form>
    </LoginStyle>
  );
};

export default Login;
