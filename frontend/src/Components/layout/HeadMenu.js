import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const HeadMenuStyle = styled.h1`
  position: fixed;
  top: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 5rem;
  background: #ffffff;
  box-shadow: 0px 1px 0px #00000014;
  border-radius: 10px 10px 0px 0px;
  font-weight: 600;
  font-size: 1.5rem;
  z-index: 1;
  backdrop-filter: blur(5px);
`;

const HeadMenu = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <HeadMenuStyle>{me?.nickname ? `${me.nickname}의 냉장고` : "냉장고를 부탁해"}</HeadMenuStyle>
  );
};

export default HeadMenu;
