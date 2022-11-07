import React from "react";
import styled from "styled-components";
import TextInput from "../common/TextInput";

const LabeledInputStyle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const LabelStyle = styled.label`
  position: absolute;
  top: 0;

  width: 100px;
  height: 40px;
  border-radius: 10px 10px 0px 0px;
  font-weight: 600;
  font-size: 0.8rem;
`;

const InputStyle = styled(TextInput)`
  &:invalid {
    color: #ff000080;
  }
`;

const LabeledInput = ({ labelText, inputName, inputType, ...rest }) => {
  return (
    <LabeledInputStyle>
      <LabelStyle htmlFor={inputName}>{labelText}</LabelStyle>
      <InputStyle
        id={inputName}
        type={inputType}
        fullWidth
        {...rest}
      ></InputStyle>
    </LabeledInputStyle>
  );
};

export default LabeledInput;
