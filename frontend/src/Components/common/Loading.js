import styled from "styled-components";
import { loading } from "../../Style/keyframes/loading";

import React from "react";

const LoadingStyle = styled.div`
  display: inline-block;
  background-color: white;
  animation: ${loading} 1s linear infinite;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0.5rem;

  &::after {
    content: "🍩";
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #f1f1f1;
    box-shadow: 0 0 1rem 0.2rem #f1f1f1;
  }

  &::after {
    animation: ${loading} 1s linear infinite;
  }
`;

const Loading = () => {
  return <LoadingStyle></LoadingStyle>;
};

export default Loading;
