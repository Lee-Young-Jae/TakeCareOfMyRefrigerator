import React from "react";
import styled from "styled-components";

const HeadMenuStyle = styled.h1`
  position: fixed;

  top: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 1px 0px #00000014;
  border-radius: 10px 10px 0px 0px;
  font-weight: 600;
  font-size: 1.2rem;
`;

const HeadMenu = ({ children }) => {
  return <HeadMenuStyle>Title이 표시됩니다.</HeadMenuStyle>;
};

export default HeadMenu;
