import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Components/common/Button";
import Flex from "../Components/common/Flex";
import PageCommonStyle from "../Components/layout/PageCommonStyle";
import theme from "../Style/theme";
import LabeledInput from "../Components/Patterns/LabeledInput";
import IsLogin from "../Components/Patterns/IsLogin";
import Dialog from "../Components/common/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_SHOPPING_LIST_REQUEST,
  DELETE_SHOPPING_LIST_REQUEST,
  LOAD_CART_REQUEST,
  LOAD_SHOPPING_LIST_REQUEST,
} from "../modules/reducers/shopping";
import { getDateString } from "../Utils/common";
import { useNavigate } from "react-router-dom";
import { slideLeft } from "../Style/keyframes/slide";

const ShopCartStyle = styled(PageCommonStyle)`
  padding: 4rem 2rem;
`;

const LabeledInputStyle = styled(LabeledInput)`
  margin: 0 0rem;
  flex-grow: 1;
`;

const ShoppingList = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  transition: 0.25s;
`;

const ShoppingItem = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  height: 3rem;
  background-color: white;
  transition: 0.25s;
  border-bottom: 3px dotted ${theme.palette.GRAY};
  padding: 1rem;
  justify-content: space-between;
  cursor: pointer;
  animation: ${slideLeft} 0.5s ease-in-out;

  // 자식 p에게 날짜 스타일을 적용
  & > .date {
    font-size: 0.7rem;
    color: ${theme.palette.GRAY};
  }

  & > .title {
    font-size: 1rem;
    color: ${theme.palette.DEEP_BLUE};
  }

  &:hover {
    //우측으로 살짝 애니메이션
    transform: translateX(0.5rem);
    transition: 0.25s;
  }
`;

const ShopCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [shoppingListName, setShoppingListName] = useState("");

  const { shopping } = useSelector((state) => state);

  const onChangeShoppingListInput = useCallback((e) => {
    setShoppingListName(e.target.value);
  }, []);

  const onClickCreateShoppingBtn = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: CREATE_SHOPPING_LIST_REQUEST,
        data: shoppingListName,
      });

      setShoppingListName("");
    },
    [dispatch, shoppingListName]
  );

  useEffect(() => {
    if (shopping.createShoppingListDone) {
      handleDialogOpen("새로운 장바구니가 생성되었습니다.");
    }
  }, [shopping.createShoppingListDone]);

  useEffect(() => {
    if (shopping.createShoppingListError) {
      handleDialogOpen(shopping.createShoppingListError);
    }
  }, [shopping.createShoppingListError]);

  useEffect(() => {
    dispatch({
      type: LOAD_SHOPPING_LIST_REQUEST,
    });
  }, [dispatch]);

  const handleDialogOpen = (content) => {
    setIsDialogOpen(true);
    setDialogContent(content);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onClickShoppingItem = useCallback(
    (event, item) => {
      event.preventDefault();
      dispatch({
        type: LOAD_CART_REQUEST,
        data: item.id,
      });
      navigate("/checklist");
    },
    [dispatch, navigate]
  );

  const [deleteId, setDeleteId] = useState(undefined);

  const onRightClickShoppingItem = (event, item) => {
    event.preventDefault();
    handleDialogOpen(`"${item.name}" 장바구니를 삭제하시겠습니까?`);
    setDeleteId(item.id);
  };

  const handleDialogConfirm = () => {
    dispatch({
      type: DELETE_SHOPPING_LIST_REQUEST,
      data: deleteId,
    });
    handleDialogClose();
  };

  return (
    <ShopCartStyle>
      <p>새로운 장바구니</p>
      <Flex>
        <LabeledInputStyle
          labelText=""
          id="shoppingListInput"
          type="text"
          autoComplete="off"
          noneLabel="true"
          value={shoppingListName}
          onChange={onChangeShoppingListInput}
        ></LabeledInputStyle>
        <Button color="DEEP_BLUE" onClick={onClickCreateShoppingBtn}>
          생성
        </Button>
      </Flex>
      <br></br>
      {/* <Flex
        radius="3rem"
        padding="1rem 0"
        align="center"
        fontSize="1.5rem"
        color={theme.palette.DEEP_BLUE}
        justify="space-between"
        width="100%"
      >
        <Button color="BRIGHT_BLUE" outline>
          2022년 11월 07일
        </Button>
        <p> ~ </p>
        <Button color="BRIGHT_BLUE" outline>
          2022년 11월 16일
        </Button>
      </Flex> */}

      <ShoppingList>
        {shopping.shoppingList.map((item) => (
          <ShoppingItem
            key={item.id}
            onContextMenu={(event) => {
              onRightClickShoppingItem(event, item);
            }}
            onClick={(event) => {
              onClickShoppingItem(event, item);
            }}
          >
            <p className="title">{item.name}</p>
            <p className="date">{getDateString(item.createdAt)}</p>
          </ShoppingItem>
        ))}
      </ShoppingList>
      <Flex justify="center" fontSize="0.7rem" margin="1rem 0">
        {shopping.shoppingList.length === 0
          ? "장바구니가 없습니다. 장바구니를 생성해주세요."
          : `${shopping.shoppingList.length}개의 장바구니가 있습니다.`}
      </Flex>
      <IsLogin></IsLogin>
      <Dialog
        title="정말 삭제할꺼예요?😥"
        visible={isDialogOpen}
        onCancel={handleDialogClose}
        onConfirm={handleDialogConfirm}
      >
        {dialogContent}
      </Dialog>
    </ShopCartStyle>
  );
};

export default ShopCart;
