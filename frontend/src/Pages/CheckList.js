import React from "react";
import styled from "styled-components";
import PageCommonStyle from "../Components/layout/PageCommonStyle";
import LabeledInput from "../Components/Patterns/LabeledInput";

const CheckListStype = styled(PageCommonStyle)``;

const LabeledInputStyle = styled(LabeledInput)`
  margin: 0.5rem 1rem;
`;

const ProductListStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const ProductItemStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const CheckList = () => {
  return (
    <CheckListStype>
      <h1>쇼핑백 상품</h1>
      상품 정보 입력
      <ProductListStyle>
        <LabeledInputStyle labelText="이름"></LabeledInputStyle>
        <LabeledInputStyle labelText="수량"></LabeledInputStyle>
        <LabeledInputStyle labelText="금액"></LabeledInputStyle>
      </ProductListStyle>
      <ProductItemStyle>상품 정보</ProductItemStyle>
      <ProductItemStyle>상품 정보</ProductItemStyle>
      <ProductItemStyle>상품 정보</ProductItemStyle>
    </CheckListStype>
  );
};

export default CheckList;
