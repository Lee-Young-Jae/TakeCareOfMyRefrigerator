import React, { useState } from "react";
import styled from "styled-components";
import PageCommonStyle from "../Components/layout/PageCommonStyle";
import IsLogin from "../Components/Patterns/IsLogin";
import LabeledInput from "../Components/Patterns/LabeledInput";
import addIcon from "../SVG/add_FILL0_wght400_GRAD0_opsz48.svg";
import removeIcon from "../SVG/delete_FILL0_wght400_GRAD0_opsz48.svg";
import shareIcon from "../SVG/icons8-share-32.png";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CART_REQUEST, DELETE_CART_REQUEST } from "../modules/reducers/shopping";
import { slideUp } from "../Style/keyframes/slide";
import Dialog from "../Components/common/Dialog";
import Radio from "../Components/common/Radio";
import { ADD_FRIGE_REQUEST } from "../modules/reducers/frige";
import theme from "../Style/theme";
import { getIcon } from "../Utils/common";

const CheckListStyle = styled(PageCommonStyle)`
  padding: 4rem 2rem;
`;

const ProductListStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 0.5rem;
  transition: 0.25s;
`;

const ProductAddBtn = styled.button`
  position: absolute;
  display: inline-block;
  border: none;
  top: 25%;
  left: 92%;
  width: 20px;
  height: 20px;
  background: url(${addIcon}) no-repeat 0px 0px;
  background-size: contain;
  transition: 0.5s;
  opacity: 0;
  cursor: pointer;

  ${ProductListStyle}:hover & {
    opacity: 1;
    transition: 0.5s;
  }

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const ProductItemStyle = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  transition: 1s;
  letter-spacing: 0.1rem;

  animation: ${slideUp} 0.3s ease-in-out;
`;

const ProductRemoveBtn = styled.button`
  position: absolute;
  display: inline-block;
  border: none;
  top: 34%;
  left: 92%;
  width: 20px;
  height: 20px;
  background: url(${removeIcon}) no-repeat 0px 0px;
  background-size: contain;
  transition: 0.5s;
  opacity: 0;
  cursor: pointer;

  ${ProductItemStyle}:hover & {
    opacity: 1;
    transition: 0.5s;
  }

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const ProductShareBtn = styled.button`
  position: absolute;
  display: inline-block;
  border: none;
  top: 34%;
  left: 86%;
  width: 18px;
  height: 18px;
  background: url(${shareIcon}) no-repeat 0px 0px;
  background-size: contain;
  transition: 0.5s;
  opacity: 0;
  cursor: pointer;

  ${ProductItemStyle}:hover & {
    opacity: 1;
    transition: 0.5s;
  }

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

// Icon Style
const IconStyle = styled.div`
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${theme.palette.TEAL};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: ${theme.palette.EMERALD};
    transition: 0.5s;
  }
`;

const CheckList = () => {
  const dispatch = useDispatch();
  // useSelector
  const { cart } = useSelector((state) => state.shopping);

  const [product, setProduct] = React.useState("");

  const onChangeProductInput = (event) => {
    setProduct(event.target.value);
  };

  const onClickProductCraeteButton = () => {
    if (product === "") {
      return;
    }
    dispatch({
      type: CREATE_CART_REQUEST,
      data: {
        name: product,
        ShoppingId: cart.ShoppingId,
      },
    });
    setProduct("");
  };

  const onClickProductDeleteButton = (event, id) => {
    event.stopPropagation();
    dispatch({
      type: DELETE_CART_REQUEST,
      data: id,
    });
  };

  const onClickProductShareButton = (event, name) => {
    event.stopPropagation();
    setIngredientName(name);
    setIsHiddenDialog(true);
  };

  //Dialog
  const [isHiddenDialog, setIsHiddenDialog] = useState(false);
  const [ingredientCategory, setIngredientCategory] = useState("냉장");
  const [expirationDate, setExpirationDate] = useState("");
  const [ingredientName, setIngredientName] = useState("");

  const onClickDialogTogleButton = () => {
    setIsHiddenDialog(!isHiddenDialog);
  };

  const onClickAddIngredientButton = () => {
    if (expirationDate === "") {
      alert("유통기한을 입력해주세요.");
      return;
    }

    dispatch({
      type: ADD_FRIGE_REQUEST,
      data: {
        name: ingredientName,
        expiration: expirationDate,
        category: ingredientCategory,
      },
    });

    setIsHiddenDialog(false);
    setIngredientName("");
    setIngredientCategory("냉장");
    setIsHiddenDialog(!isHiddenDialog);
  };

  const onChangeIngredientInformation = (event) => {
    if (event?.target?.id === "expiration") {
      setExpirationDate(event.target.value);
      return;
    }
    setIngredientCategory(event);
  };
  return (
    <CheckListStyle>
      <ProductListStyle>
        <LabeledInput
          fullWidth={true}
          autoComplete="off"
          labelText="상품명"
          inputName="name"
          value={product}
          onChange={onChangeProductInput}
        ></LabeledInput>
        {/* <LabeledInputStyle labelText="수량" inputName="amount" type="number"></LabeledInputStyle>
        <LabeledInputStyle labelText="금액" inputName="money" type="number"></LabeledInputStyle> */}
        <ProductAddBtn onClick={onClickProductCraeteButton}></ProductAddBtn>
      </ProductListStyle>
      {cart.cart.map((item) => (
        <ProductItemStyle key={item.id}>
          <IconStyle>{getIcon(item.name)}</IconStyle>
          {item.name}
          <ProductShareBtn
            onClick={(event) => {
              onClickProductShareButton(event, item.name);
            }}
          ></ProductShareBtn>
          <ProductRemoveBtn
            onClick={(event) => {
              onClickProductDeleteButton(event, item.id);
            }}
          ></ProductRemoveBtn>
        </ProductItemStyle>
      ))}
      {/** 쇼핑 목록에 등록된 아이템이 없네요 쇼핑할 상품 정보를 입력해주세요 */}
      {cart.cart.length === 0 && (
        <ProductItemStyle>쇼핑할 상품 정보를 입력해주세요</ProductItemStyle>
      )}
      <Dialog
        title="식품을 냉장고에 추가합니다."
        visible={isHiddenDialog}
        confirmText="추가"
        cancelText="취소"
        onConfirm={onClickAddIngredientButton}
        onCancel={onClickDialogTogleButton}
      >
        <LabeledInput
          inputName="expiration"
          inputType="date"
          value={expirationDate}
          labelText="유통기한"
          autoComplete="off"
          onChange={onChangeIngredientInformation}
        ></LabeledInput>
        <Radio
          name={["냉장", "냉동"]}
          onChangeState={onChangeIngredientInformation}
          defaultValue={ingredientCategory}
          value={ingredientCategory}
        ></Radio>
      </Dialog>
      <IsLogin></IsLogin>
    </CheckListStyle>
  );
};

export default CheckList;
