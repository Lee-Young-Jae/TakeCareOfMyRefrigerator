import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DELETE_FRIGE_REQUEST } from "../../modules/reducers/frige";
import { slideUp } from "../../Style/keyframes/slide";
import theme from "../../Style/theme";
import { getDiffDate, getDateString, getIcon, getJosaString } from "../../Utils/common";
import Button from "../common/Button";
import Dialog from "../common/Dialog";

const FridgeIngredientStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.5rem;
  transition: 1s;
  letter-spacing: 0.1rem;
  animation: ${slideUp} 0.3s ease-in-out;
  margin: 0.5rem 0;
  cursor: pointer;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  /* width: 30.1%; */
  width: 100%;

  &:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }

  & .ingredientName {
    font-size: 1.1rem;
    font-weight: 600;
  }

  & .ingredientDate {
    font-size: 0.8rem;
    color: ${theme.palette.GRAY};
  }

  // 유통기한 상태에 따라 다른 색상을 적용
  & .ingredientDate.expiration {
    color: ${theme.expiration.TEAL};
  }

  & .ingredientDate.expiration.expired {
    color: ${theme.expiration.RED};
  }

  & .ingredientDate.expiration.expiring {
    color: ${theme.expiration.ORANGE};
  }
`;

// Icon Style
const IconStyle = styled.div`
  top: 1rem;
  width: 2rem;
  height: 2rem;
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

const FridgeIngredient = ({ id, name, expiration, category, registedDate, onContext }) => {
  const dispatch = useDispatch();

  const [diffDate, setDiffDate] = useState(getDiffDate(expiration, registedDate));

  const navigation = useNavigate();

  useEffect(() => {
    const now = new Date();
    setDiffDate(getDiffDate(expiration, now));
  }, [expiration]);

  //Dialog

  const [dialog, setDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const onContextIngredient = useCallback(
    (e) => {
      e.preventDefault();
      setDialog(true);
      setDialogTitle(`${getJosaString(name, ["을", "를"])} 냉장고에서 꺼낼게요`);
    },
    [name]
  );

  const onConfirmDeleteIngredient = useCallback(() => {
    dispatch({
      type: DELETE_FRIGE_REQUEST,
      data: id,
    });

    setDialog(false);
    setDialogTitle("");
  }, [dispatch, id]);

  return (
    <>
      <FridgeIngredientStyle
        onContextMenu={(event) => {
          onContextIngredient(event, id);
        }}
      >
        {diffDate > 3 ? (
          <>
            <div className="ingredientDate expiration">
              {getDateString(expiration)}까지 ({diffDate}일 남음)
            </div>
            <IconStyle>{getIcon(name)}</IconStyle>
            <div className="ingredientName">{name}</div>
            <div className="ingredientDate">{`구매일자: ${getDateString(registedDate)}`}</div>
          </>
        ) : diffDate >= 0 ? (
          <>
            <div className="ingredientDate expiration expiring">
              {getDateString(expiration)}까지 ({diffDate}일 남음)
            </div>
            <IconStyle>{getIcon(name)}</IconStyle>

            <div className="ingredientName">{name}</div>
            <div className="ingredientDate">{`구매일자: ${getDateString(registedDate)}`}</div>
          </>
        ) : (
          <>
            <span className="ingredientDate expiration expired">
              {`유통기한 만료 (${Math.abs(diffDate)}일 지남)`}
            </span>
            <IconStyle>{getIcon(name)}</IconStyle>

            <div className="ingredientName">{name}</div>
            <span className="ingredientDate">{`구매일자: ${getDateString(registedDate)}`}</span>

            <Button
              size="small"
              onClick={() => {
                // setDialog(true);
                navigation("/shopcart");
              }}
            >
              장바구니에 다시 담기
            </Button>
          </>
        )}
      </FridgeIngredientStyle>
      <Dialog
        visible={dialog}
        title={<IconStyle>{getIcon(name)}</IconStyle>}
        onCancel={() => {
          setDialog(!dialog);
        }}
        onConfirm={onConfirmDeleteIngredient}
      >
        <p>{dialogTitle}</p>
      </Dialog>
    </>
  );
};

export default FridgeIngredient;
