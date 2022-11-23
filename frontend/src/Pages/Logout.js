import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { useDispatch } from "react-redux";

import PageCommonStyle from "../Components/layout/PageCommonStyle";
import { USER_LOGOUT_REQUEST } from "../modules/reducers/user";

const LogoutStyle = styled(PageCommonStyle)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PageStateStyle = styled.div`
  margin: 0 auto;
  padding: 3rem;
  ${({ theme }) => {
    const start = theme.palette.BRIGHT_BLUE + 28;
    const end = theme.palette.EMERALD + 28;
    return css`
      background: linear-gradient(180deg, ${start} 0%, ${end} 100%);
    `;
  }}

  box-shadow: 0px 5px 24px rgb(0 0 0 / 25%),
    inset 0px 0px 3px 3px rgb(255 255 255 / 16%);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border-radius: 2rem;
  font-weight: bold;
  font-size: 4rem;
  color: #ffffff;
  text-shadow: 0px 0.2rem 1.2rem rgb(0 0 0 / 20%);
  text-align: center;
  align-self: flex-start;
  -webkit-animation: 0.75s ease vFs4e;
  animation: 0.75s ease vFs4e;
`;

const UoYy3 = keyframes`
  0% {
    opacity: 0;

    transform: rotateZ(0);
  }
 
  75% {
    opacity: 1;
    top: -6rem;
    transform: rotateZ(-40deg);
  } 
  100% {
    opacity: 1;
    top: -3rem;
    transform: rotateZ(-30deg);
  } 
`;

const PageStateWrapper = styled.div`
  position: relative;
  &:before {
    content: "😜";
    text-align: center;
    display: flex;
    position: absolute;
    display: block;
    top: 0;
    left: calc(50% - 3.25rem);
    width: 5rem;
    height: 5rem;
    font-size: 3.2em;
    background: ${({ theme }) => theme.palette.BRIGHT_BLUE};
    border-radius: 20px;
    transition: 1s;
    -webkit-animation: 2s forwards ${UoYy3};
    animation: 2s forwards ${UoYy3};
  }
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.Gray};
  margin-bottom: 1rem;
`;

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: USER_LOGOUT_REQUEST });
      navigate("/");
    }, 3000);
  }, [navigate, dispatch]);
  return (
    <LogoutStyle>
      <PageStateWrapper>
        <PageStateStyle>logout</PageStateStyle>
        <br></br>
        <SubTitle>Logout...</SubTitle>
        <br></br>
        <p>로그아웃 중입니다...</p>
        <br></br>
      </PageStateWrapper>
    </LogoutStyle>
  );
};

export default Logout;
