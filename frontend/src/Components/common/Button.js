import React from "react";
import styled, { css } from "styled-components";

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:active {
        opacity: 0.7;
      }
      &:hover {
        opacity: 0.7;
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background-color: ${selected};
            color: white;
          `}
    `;
  }}
`;

const sizes = {
  large: {
    height: "3rem",
    // fontSize: "1.25rem",
    fontSize: "1rem",
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStype = css`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  background-color: ${({ theme }) => theme.palette.GRAY};
  color: white;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  ${fullWidthStype}
`;

const Button = ({ children, color, size, outline, fullWidth, ...rest }) => {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  color: "TEAL",
  size: "medium",
};

export default Button;
