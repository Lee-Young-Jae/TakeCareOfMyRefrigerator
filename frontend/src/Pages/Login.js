import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import LabeledInput from "../Components/Patterns/LabeledInput";
import Button from "../Components/common/Button";
import PageCommonStyle from "../Components/layout/PageCommonStyle";
import { USER_LOGIN_REQUEST } from "../modules/reducers/user";
import Dialog from "../Components/common/Dialog";

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
  const [loginInformation, setLoginInformation] = useState({
    id: "",
    pw: "",
  });
  const dispatch = useDispatch();

  const { logInError, logInDone } = useSelector((state) => state.user.state);

  const navigate = useNavigate();

  useEffect(() => {
    if (logInError) {
      setDialogMessage(logInError);
      setDialog(true);
    }

    if (logInDone) {
      setDialogMessage("로그인 성공");
      setDialog(true);
      navigate("/");
    }
  }, [logInError, logInDone, navigate]);

  const onClickLoginButton = useCallback(
    (event) => {
      event.preventDefault();
      console.log(loginInformation);
      dispatch({
        type: USER_LOGIN_REQUEST,
        data: {
          loginId: loginInformation.id,
          password: loginInformation.pw,
        },
      });
    },
    [loginInformation, dispatch]
  );

  const onChangeLoginInformation = useCallback(
    (e) => {
      const { id, value } = e.target;
      setLoginInformation({
        ...loginInformation,
        [id]: value,
      });
    },
    [loginInformation]
  );

  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const onConfirm = () => {
    setDialog(false);
  };

  const onCancel = () => {
    setDialog(false);
  };

  return (
    <LoginStyle>
      <form>
        <LabeledInput
          labelText="ID"
          inputName="id"
          autoComplete="off"
          pattern="[A-Za-z0-9]+"
          onChange={onChangeLoginInformation}
        ></LabeledInput>
        <LabeledInput
          labelText="Password"
          inputName="pw"
          inputType="password"
          onChange={onChangeLoginInformation}
        ></LabeledInput>
        <Button type="submit" size="large" fullWidth onClick={onClickLoginButton}>
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
          <StyleLink to="/404">Naver</StyleLink>
          <StyleLink to="/404">Kakao</StyleLink>
          <StyleLink to="/404">Google</StyleLink>
          <StyleLink to="/404">Facebook</StyleLink>
          <StyleLink to="/404">Apple</StyleLink>
          {/* <span>Naver</span>
          <span>Kakao</span>
          <span>Google</span>
          <span>Facebook</span>
          <span>Apple</span> */}
        </StyleSocialLoginButtonWrapper>
      </form>
      <Dialog
        onlyConfirm
        title="내 냉장고를 부탁해"
        visible={dialog}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        {dialogMessage}
      </Dialog>
    </LoginStyle>
  );
};

export default Login;
