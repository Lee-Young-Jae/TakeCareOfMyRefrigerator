import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
`;

const slideUp = keyframes`

  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(100px);
  }
`;

const DarkBackground = styled.div`
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.25s ease-out forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation: ${fadeOut} 0.15s ease-out forwards;
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  div {
    font-size: 1.125rem;
  }
  animation: ${slideUp} 0.25s ease-out forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation: ${slideDown} 0.15s ease-out forwards;
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
  & button + button {
    margin-left: 0.5rem;
  }
`;

const Dialog = ({
  title,
  children,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  visible,
  onClickBackground,
  onlyConfirm,
  ...rest
}) => {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    //visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 150);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;
  return (
    <DarkBackground disappear={!visible} onClick={onClickBackground}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <div>{children}</div>
        <ButtonGroup>
          {onlyConfirm || (
            <Button color="GRAY" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button color="TEAL" onClick={onConfirm}>
            {confirmText}
          </Button>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
};

Dialog.defaultProps = {
  cancelText: "취소",
  confirmText: "확인",
  visible: false,
};

export default Dialog;
