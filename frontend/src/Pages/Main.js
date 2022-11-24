import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import PageCommonStyle from "../Components/layout/PageCommonStyle";

const MainStyle = styled(PageCommonStyle)`
  font-size: 2rem;
  overflow: hidden;
`;

const gradualReduction = keyframes`
  from {
    opacity: .3;
    transform: scale(20);
  }
  to {
    transform: scale(16);
    opacity: 0.1;
  }
`;

const Reduction = styled.div`
  position: relative;
  top: 0;
  left: 0;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 3rem;
    width: 2rem;
    height: 2rem;
    background: ${({ theme }) => theme.palette.TEAL};
    ${({ color }) =>
      color === "LIME" &&
      css`
        background: ${({ theme }) => theme.palette.LIME};
      `}
    border-radius: 50%;
    animation: ${gradualReduction} 1s ease-out forwards;

    ${({ time }) =>
      time &&
      css`
        animation: ${gradualReduction} ${time}s ease-out forwards;
      `}
  }
`;

const flow = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  5% {
    opacity: 1;
    transform: translateY(0%);
  }
  15% {
    transform: translateY(200%);
  }
  30% {
    transform: translateY(-300%);
  }
  45% {
    transform: translateY(200%);
  }
  60% {
    opacity: 1;
    transform: translateY(-200%);
  }
  75% {
    transform: translateY(100%);
  }
  90% {
    opacity: 1;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(100%);
  }
`;

const FlowWord = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.TEAL};
  ${({ color }) =>
    color === "LIME" &&
    css`
      color: ${({ theme }) => theme.palette.LIME};
    `}
  animation: ${flow} 20s ease-out infinite;
`;

const StyleMainWordWrapper = styled.div`
  overflow: hidden;
  height: 4rem;
  margin: 2rem 0 0 0;
`;

const mainWordList = ["신선한", "보고싶은", "알뜰한", "매력적인"];
const Main = () => {
  return (
    <MainStyle>
      <Reduction></Reduction>
      <StyleMainWordWrapper>
        {mainWordList.map((word) => (
          <FlowWord key={word}>{`"${word}"`}</FlowWord>
        ))}
      </StyleMainWordWrapper>
      <br></br>
      <h2>내 냉장고를</h2>
      <Reduction color="LIME" time={1.5}></Reduction>
      <h2>부탁해!</h2>
      <br></br>
      <br></br>
    </MainStyle>
  );
};

export default Main;
