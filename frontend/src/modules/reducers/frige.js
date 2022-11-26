import produce from "immer";

const initialState = {
  state: {
    loadFrigeLoading: false, // 냉장고 재료 불러오기 시도중
    loadFrigeDone: false,
    loadFrigeError: null,

    addFrigeLoading: false, // 냉장고 재료 추가 시도중
    addFrigeDone: false,
    addFrigeError: null,

    deleteFrigeLoading: false, // 냉장고 재료 삭제 시도중
    deleteFrigeDone: false,
    deleteFrigeError: null,

    loadRecipeLoading: false, // 레시피 추천 시도중
    loadRecipeDone: false,
    loadRecipeError: null,

    loadSearchRecipeLoading: false, // 레시피 검색 시도중
    loadSearchRecipeDone: false,
    loadSearchRecipeError: null,
  },
  frige: {
    ingredients: [], // 냉장고 재료
    recipes: [], // 레시피 추천
    searchRecipes: [], // 레시피 검색
  },
};

/* 액션 타입 만들기 */

export const INIT = "INIT";

export const LOAD_FRIGE_REQUEST = "LOAD_FRIGE_REQUEST";
export const LOAD_FRIGE_SUCCESS = "LOAD_FRIGE_SUCCESS";
export const LOAD_FRIGE_FAILURE = "LOAD_FRIGE_FAILURE";

export const ADD_FRIGE_REQUEST = "ADD_FRIGE_REQUEST";
export const ADD_FRIGE_SUCCESS = "ADD_FRIGE_SUCCESS";
export const ADD_FRIGE_FAILURE = "ADD_FRIGE_FAILURE";

export const DELETE_FRIGE_REQUEST = "DELETE_FRIGE_REQUEST";
export const DELETE_FRIGE_SUCCESS = "DELETE_FRIGE_SUCCESS";
export const DELETE_FRIGE_FAILURE = "DELETE_FRIGE_FAILURE";

export const LOAD_RECIPE_REQUEST = "LOAD_RECIPE_REQUEST";
export const LOAD_RECIPE_SUCCESS = "LOAD_RECIPE_SUCCESS";
export const LOAD_RECIPE_FAILURE = "LOAD_RECIPE_FAILURE";

export const LOAD_SEARCH_RECIPE_REQUEST = "LOAD_SEARCH_RECIPE_REQUEST";
export const LOAD_SEARCH_RECIPE_SUCCESS = "LOAD_SEARCH_RECIPE_SUCCESS";
export const LOAD_SEARCH_RECIPE_FAILURE = "LOAD_SEARCH_RECIPE_FAILURE";

// 리듀서 선언
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        draft.user = action.data;
        break;

      case LOAD_FRIGE_REQUEST:
        draft.state.loadFrigeLoading = true;
        draft.state.loadFrigeDone = false;
        draft.state.loadFrigeError = null;
        break;
      case LOAD_FRIGE_SUCCESS:
        draft.state.loadFrigeLoading = false;
        draft.state.loadFrigeDone = true;
        draft.state.loadFrigeError = null;
        draft.frige = action.data;
        break;
      case LOAD_FRIGE_FAILURE:
        draft.state.loadFrigeLoading = false;
        draft.state.loadFrigeDone = false;
        draft.state.loadFrigeError = action.error;
        break;

      case ADD_FRIGE_REQUEST:
        draft.state.addFrigeLoading = true;
        draft.state.addFrigeDone = false;
        draft.state.addFrigeError = null;
        break;
      case ADD_FRIGE_SUCCESS:
        draft.state.addFrigeLoading = false;
        draft.state.addFrigeDone = true;
        draft.state.addFrigeError = null;
        draft.frige = action.data;
        break;
      case ADD_FRIGE_FAILURE:
        draft.state.addFrigeLoading = false;
        draft.state.addFrigeDone = false;
        draft.state.addFrigeError = action.error;
        break;

      case DELETE_FRIGE_REQUEST:
        draft.state.deleteFrigeLoading = true;
        draft.state.deleteFrigeDone = false;
        draft.state.deleteFrigeError = null;
        break;
      case DELETE_FRIGE_SUCCESS:
        draft.state.deleteFrigeLoading = false;
        draft.state.deleteFrigeDone = true;
        draft.state.deleteFrigeError = null;
        draft.user = action.data;
        break;
      case DELETE_FRIGE_FAILURE:
        draft.state.deleteFrigeLoading = false;
        draft.state.deleteFrigeDone = false;
        draft.state.deleteFrigeError = action.error;
        break;

      case LOAD_RECIPE_REQUEST:
        draft.state.loadRecipeLoading = true;
        draft.state.loadRecipeDone = false;
        draft.state.loadRecipeError = null;
        break;
      case LOAD_RECIPE_SUCCESS:
        draft.state.loadRecipeLoading = false;
        draft.state.loadRecipeDone = true;
        draft.state.loadRecipeError = null;
        draft.user = action.data;
        break;
      case LOAD_RECIPE_FAILURE:
        draft.state.loadRecipeLoading = false;
        draft.state.loadRecipeDone = false;
        draft.state.loadRecipeError = action.error;
        break;

      case LOAD_SEARCH_RECIPE_REQUEST:
        draft.state.loadSearchRecipeLoading = true;
        draft.state.loadSearchRecipeDone = false;
        draft.state.loadSearchRecipeError = null;
        break;
      case LOAD_SEARCH_RECIPE_SUCCESS:
        draft.state.loadSearchRecipeLoading = false;
        draft.state.loadSearchRecipeDone = true;
        draft.state.loadSearchRecipeError = null;
        draft.user = action.data;
        break;
      case LOAD_SEARCH_RECIPE_FAILURE:
        draft.state.loadSearchRecipeLoading = false;
        draft.state.loadSearchRecipeDone = false;
        draft.state.loadSearchRecipeError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default reducer;
