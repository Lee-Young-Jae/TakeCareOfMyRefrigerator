import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ADD_LACK_INGREDIENTS_REQUEST } from "../../modules/reducers/shopping";
import { slideUp } from "../../Style/keyframes/slide";
import theme from "../../Style/theme";
import { getArrayFromString } from "../../Utils/common";
import Dialog from "../common/Dialog";
import LabeledInput from "../Patterns/LabeledInput";

const RecipeStyle = styled.div`
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
  cursor: pointer;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  /* width: 30.1%; */
  box-sizing: border-box;
  width: 100%;
  &:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }

  & h1 {
    font-size: 0.8rem;
    padding: 1rem;
  }
`;

const IngredientListStyle = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const IngredientStyle = styled.li`
  text-align: center;
  /* background-color: ${theme.palette.TEAL}; */
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 0.5rem;
  transition: 1s;
  letter-spacing: 0.1rem;
  animation: ${slideUp} 0.3s ease-in-out;
  margin: 0.2rem 0.4rem;
  cursor: pointer;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);

  /* width: 30.1%; */
  &:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }

  &.active {
    background-color: ${theme.palette.TEAL};
  }
`;

const Recipe = ({ id, name, intro, ingredients }) => {
  const dispatch = useDispatch();
  const { frige } = useSelector((state) => state.frige);
  // Dialog
  const [dialog, setDialog] = useState(false);
  const [dialogRecipeName, setDialogRecipeName] = useState(name);

  const onChangeDialogName = useCallback((e) => {
    setDialogRecipeName(e.target.value);
  }, []);

  const onClickRecipe = useCallback(() => {
    setDialog(true);
  }, []);

  const onConfirmRecipe = useCallback(() => {
    // 부족한 재료만 추출 ingredients 에 frigeIngredient이 포함된 것이 아닌것
    const lackIngredients = getArrayFromString(ingredients).filter(
      (ingredient) => !frige.some((frigeIngredient) => ingredient.includes(frigeIngredient.name))
    );

    // 부족한 재료가 없으면
    if (lackIngredients.length === 0) {
      setDialog(false);

      return;
    }

    console.log(lackIngredients);
    // 부족한 재료가 있으면
    dispatch({
      type: ADD_LACK_INGREDIENTS_REQUEST,
      data: { lackIngredients, name: dialogRecipeName },
    });

    setDialog(false);
  }, [frige, ingredients, dialogRecipeName, dispatch]);

  return (
    <>
      <RecipeStyle onClick={onClickRecipe}>
        <h1>{name}</h1>
        {/* <p>{intro}</p> */}
        <IngredientListStyle>
          {getArrayFromString(ingredients).map((ingredient, index) => (
            <IngredientStyle
              key={ingredient + index}
              className={
                frige.some((frigeIngredient) => ingredient.includes(frigeIngredient.name))
                  ? "active"
                  : ""
              }
            >
              {ingredient}
            </IngredientStyle>
          ))}
        </IngredientListStyle>
      </RecipeStyle>
      <Dialog
        visible={dialog}
        title={"📃 " + name}
        onCancel={() => {
          setDialog(false);
        }}
        onConfirm={onConfirmRecipe}
      >
        <LabeledInput
          labelText="장바구니 이름"
          inputName="cart"
          onChange={onChangeDialogName}
          inputType="text"
          defaultValue={name}
        ></LabeledInput>
        <p>부족한 재료를 장바구니에 담을게요</p>
      </Dialog>
    </>
  );
};

export default Recipe;
