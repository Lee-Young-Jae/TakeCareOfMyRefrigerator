import React from "react";
import styled, { css, keyframes } from "styled-components";
import TextInput from "../common/TextInput";

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

const animationStyle = css`
  ${({ animation }) => {
    return (
      animation &&
      css`
        animation: ${slideUp} 1s forwards ease-out;
      `
    );
  }}
`;

const LabeledInputStyle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  /** 애니메이션 */
  ${animationStyle}
`;

const LabelStyle = styled.label`
  position: absolute;
  top: 0;

  width: 100px;
  height: 40px;
  border-radius: 10px 10px 0px 0px;
  font-weight: 600;
  font-size: 0.8rem;
  z-index: 1;
`;

const InputStyle = styled(TextInput)`
  &:invalid {
    color: #ff000080;
  }
`;

const ChildrenStyle = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #999;
`;

const LabeledInput = ({
  labelText,
  inputName,
  inputType,
  children,
  autoComplete,
  slideup,
  animation,
  ...rest
}) => {
  return (
    <LabeledInputStyle animation={animation}>
      <LabelStyle htmlFor={inputName}>{labelText}</LabelStyle>
      <InputStyle
        id={inputName}
        type={inputType}
        autoComplete={autoComplete}
        autocomplete={autoComplete}
        fullWidth
        {...rest}
      ></InputStyle>
      <ChildrenStyle>{children}</ChildrenStyle>
    </LabeledInputStyle>
  );
};

export default LabeledInput;
