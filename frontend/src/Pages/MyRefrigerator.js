import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Dialog from "../Components/common/Dialog";
import Flex from "../Components/common/Flex";
import Radio from "../Components/common/Radio";
import FridgeIngredient from "../Components/index.js/FridgeIngredient";
import PageCommonStyle from "../Components/layout/PageCommonStyle";
import LabeledInput from "../Components/Patterns/LabeledInput";
import { slideUp } from "../Style/keyframes/slide";
import theme from "../Style/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_FRIGE_REQUEST,
  LOAD_FRIGE_REQUEST,
  LOAD_RECIPE_REQUEST,
} from "../modules/reducers/frige";
import IsLogin from "../../src/Components/Patterns/IsLogin";
import Recipe from "../Components/index.js/Recipe";
import Loading from "../Components/common/Loading";

const MyRefrigeratorStyle = styled(PageCommonStyle)`
  padding: 0;
`;

// 냉장고 카테고리
const RefrigerCategory = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 100%;
  /* background-color: ${theme.palette.GRAY}; */
  box-sizing: border-box;
`;

const RefrigerCategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 3rem;
  /* background-color: ${theme.palette.GRAY}; */
  box-sizing: border-box;
  transition: 0.5s;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  cursor: pointer;

  &.active {
    background-color: ${theme.palette.TEAL};
    transition: 0.5s;
    width: 35%;
    color: white;
    box-shadow: 0 0 2px ${theme.palette.TEAL};
  }

  &:hover {
    background-color: ${theme.palette.TEAL};
    transition: 0.5s;
    width: 37%;
    color: white;
  }
`;

const FlexStyle = styled(Flex)`
  width: 500px;

  /* background-color: ${theme.palette.GRAY}; */
  box-sizing: border-box;
  animation: ${slideUp} 0.3s ease-in-out;

  & input {
    /* background-color: ${theme.palette.GRAY}; */
    // box-shadow 하단에만
    /* box-shadow: 0 1px 0 0 ${theme.palette.TEAL}; */
    outline: none;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    box-sizing: border-box;
  }
`;

const RecipesStyle = styled.div`
  width: 500px;
  height: 100%;
  box-sizing: border-box;
  animation: ${slideUp} 0.3s ease-in-out;
`;

const SubTitle = styled.div`
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
`;

const MyRefrigerator = () => {
  const dispatch = useDispatch();
  const { frige, recipes, state } = useSelector((state) => state.frige);

  const [category, setCategory] = useState("모두");

  const [isHiddenDialog, setIsHiddenDialog] = useState(false);

  const [ingredientInformation, setIngredientInformation] = useState({
    name: "",
    expiration: "",
  });

  const [ingredientCategory, setIngredientCategory] = useState("냉장");

  const onChangeIngredientInformation = useCallback(
    (e) => {
      const { id, value } = e.target;

      setIngredientInformation({
        ...ingredientInformation,
        [id]: value,
      });
    },
    [ingredientInformation]
  );

  const onClickCategory = (e) => {
    setCategory(e.target.innerText);
  };

  // Dialog

  const onClickDialogTogleButton = () => {
    setIsHiddenDialog(!isHiddenDialog);
  };

  const onChangeIngredientCategory = (e) => {
    setIngredientCategory(e);
  };

  const onClickAddIngredientButton = () => {
    if (ingredientInformation.name === "") {
      alert("재료명을 입력해주세요.");
      return;
    }

    if (ingredientInformation.expiration === "") {
      alert("유통기한을 입력해주세요.");
      return;
    }

    dispatch({
      type: ADD_FRIGE_REQUEST,
      data: {
        name: ingredientInformation.name,
        expiration: ingredientInformation.expiration,
        category: ingredientCategory,
      },
    });

    setIngredientInformation({
      name: "",
      expiration: "",
    });
    setIngredientCategory("냉장");

    setIsHiddenDialog(!isHiddenDialog);
  };

  useEffect(() => {
    dispatch({
      type: LOAD_FRIGE_REQUEST,
    });

    dispatch({
      type: LOAD_RECIPE_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_RECIPE_REQUEST,
    });
  }, [state.deleteFrigeDone, state.addFrigeDone, dispatch]);

  return (
    <MyRefrigeratorStyle>
      <RefrigerCategory>
        <RefrigerCategoryItem
          className={category === "냉장고" ? "active" : ""}
          onClick={onClickCategory}
        >
          냉장고
        </RefrigerCategoryItem>
        <RefrigerCategoryItem
          className={category === "냉동고" ? "active" : ""}
          onClick={onClickCategory}
        >
          냉동고
        </RefrigerCategoryItem>
        <RefrigerCategoryItem
          className={category === "모두" ? "active" : ""}
          onClick={onClickCategory}
        >
          모두
        </RefrigerCategoryItem>
      </RefrigerCategory>
      <SubTitle>Ingredient</SubTitle>
      {frige.length >= 0 &&
        (category === "모두"
          ? frige.map((ingredient) => (
              <FridgeIngredient
                key={ingredient.id}
                id={ingredient.id}
                name={ingredient.name}
                expiration={ingredient.expirationDate}
                category={ingredient.type}
                registedDate={ingredient.createdAt}
              />
            ))
          : frige
              .filter((ingredient) => ingredient.type === category.slice(0, 2))
              .map((ingredient) => (
                <FridgeIngredient
                  key={ingredient.id}
                  id={ingredient.id}
                  name={ingredient.name}
                  expiration={ingredient.expirationDate}
                  category={ingredient.type}
                  registedDate={ingredient.createdAt}
                />
              )))}

      <FlexStyle
        align="center"
        justify="right"
        padding="0.5rem 0 0 0"
        cursor="pointer"
        onClick={onClickDialogTogleButton}
      >
        식품을 제가 넣어볼게요!🧊
      </FlexStyle>
      <Dialog
        title="어떤 식품을 냉장고에 넣을까요?"
        visible={isHiddenDialog}
        confirmText="추가"
        cancelText="취소"
        onConfirm={onClickAddIngredientButton}
        onCancel={onClickDialogTogleButton}
      >
        <LabeledInput
          inputName="name"
          inputType="text"
          labelText="재료명"
          autoComplete="off"
          onChange={onChangeIngredientInformation}
          value={ingredientInformation.name}
        ></LabeledInput>

        <LabeledInput
          inputName="expiration"
          inputType="date"
          value={ingredientInformation.expirationDate}
          labelText="유통기한"
          autoComplete="off"
          onChange={onChangeIngredientInformation}
        ></LabeledInput>
        <Radio
          name={["냉장", "냉동"]}
          onChangeState={onChangeIngredientCategory}
          defaultValue={ingredientCategory}
          value={ingredientCategory}
        ></Radio>
      </Dialog>
      {/** 레시피 추천기능 */}
      <FlexStyle align="center" justify="right" padding="0.5rem 0 0 0" cursor="pointer">
        냉장고에 있는 재료로 레시피를 추천받아볼까요?🍲
      </FlexStyle>
      <SubTitle>Recipe {state.loadRecipeLoading && <Loading></Loading>} </SubTitle>
      <RecipesStyle>
        {recipes?.length <= 0 ? (
          <SubTitle>추천 레시피가 없네요, 식재료를 등록해서 새로운 레시피를 찾아보세요</SubTitle>
        ) : (
          recipes?.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              name={recipe.recipeName}
              foodName={recipe.foodName}
              ingredients={recipe.foodRecipe}
              steps={recipe.steps}
              time={recipe.time}
              difficulty={recipe.difficulty}
              category={recipe.category}
              intro={recipe.introduce}
            />
          ))
        )}
      </RecipesStyle>

      {/* <div>#유통기한 기능</div>
      <p>- 각각의 식재료는 유통기한 순으로 정렬</p>
      <p> ㄴ 유통기한 지남 - 진한 적색 (장바구니에 다시 담기 버튼)</p>
      <p> ㄴ 유통기한 3일 이내 - 연한 적색</p>
      <p> ㄴ 유통기한 7일 이내 - 노란색</p>
      <p> ㄴ 유통기한 7일 이상 - 하늘색</p>
      <p>식재료 [구매일자(냉장고 들어간 시간), 유통기한, 종류, 이름]</p>
      <p>#레시피 기능</p>
      <div>냉장고에 있는 식재료로 레시피를 추천해 줍니다</div>
      <p> ㄴ 유통기한이 지난 식재료는 레시피 추천 재료에 포함되지 않는다</p>
      <div>레시피 이름으로 검색이 가능합니다</div>
      <div>검색된 레시피 재료들 장바구니 목록에 넣기</div> */}
      <IsLogin></IsLogin>
    </MyRefrigeratorStyle>
  );
};

export default MyRefrigerator;
