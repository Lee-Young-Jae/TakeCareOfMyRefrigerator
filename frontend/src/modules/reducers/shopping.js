import produce from "immer";

const initialState = {
  state: {
    loadShoppingListLoading: false, // 쇼핑 리스트 불러오기 시도중
    loadShoppingListDone: false,
    loadShoppingListError: null,

    createShoppingListLoading: false, // 쇼핑 리스트 생성 시도중
    createShoppingListDone: false,
    createShoppingListError: null,

    deleteShoppingListLoading: false, // 쇼핑 리스트 삭제 시도중
    deleteShoppingListDone: false,
    deleteShoppingListError: null,

    loadCartLoading: false, // 장바구니 불러오기 시도중
    loadCartDone: false,
    loadCartError: null,

    createCartLoading: false, // 장바구니 생성 시도중
    createCartDone: false,
    createCartError: null,

    deleteCartLoading: false, // 장바구니 삭제 시도중
    deleteCartDone: false,
    deleteCartError: null,

    loadIngredientLoading: false, //냉장고 재료 불러오기 시도중
    loadIngredientDone: false,
    loadIngredientError: null,

    createIngredientLoading: false, // 냉장고 재료 생성 시도중
    createIngredientDone: false,
    createIngredientError: null,

    deleteIngredientLoading: false, // 냉장고 재료 삭제 시도중
    deleteIngredientDone: false,
    deleteIngredientError: null,
  },
  shoppingList: [],
  cart: {
    ShoppingId: null,
    cart: [],
    fridge: [],
  },
};

/* 액션 타입 만들기 */
export const INIT = "INIT";

export const LOAD_SHOPPING_LIST_REQUEST = "LOAD_SHOPPING_LIST_REQUEST";
export const LOAD_SHOPPING_LIST_SUCCESS = "LOAD_SHOPPING_LIST_SUCCESS";
export const LOAD_SHOPPING_LIST_FAILURE = "LOAD_SHOPPING_LIST_FAILURE";

export const CREATE_SHOPPING_LIST_REQUEST = "CREATE_SHOPPING_LIST_REQUEST";
export const CREATE_SHOPPING_LIST_SUCCESS = "CREATE_SHOPPING_LIST_SUCCESS";
export const CREATE_SHOPPING_LIST_FAILURE = "CREATE_SHOPPING_LIST_FAILURE";

export const DELETE_SHOPPING_LIST_REQUEST = "DELETE_SHOPPING_LIST_REQUEST";
export const DELETE_SHOPPING_LIST_SUCCESS = "DELETE_SHOPPING_LIST_SUCCESS";
export const DELETE_SHOPPING_LIST_FAILURE = "DELETE_SHOPPING_LIST_FAILURE";

export const LOAD_CART_REQUEST = "LOAD_CART_REQUEST";
export const LOAD_CART_SUCCESS = "LOAD_CART_SUCCESS";
export const LOAD_CART_FAILURE = "LOAD_CART_FAILURE";

export const CREATE_CART_REQUEST = "CREATE_CART_REQUEST";
export const CREATE_CART_SUCCESS = "CREATE_CART_SUCCESS";
export const CREATE_CART_FAILURE = "CREATE_CART_FAILURE";

export const DELETE_CART_REQUEST = "DELETE_CART_REQUEST";
export const DELETE_CART_SUCCESS = "DELETE_CART_SUCCESS";
export const DELETE_CART_FAILURE = "DELETE_CART_FAILURE";

export const LOAD_INGREDIENT_REQUEST = "LOAD_INGREDIENT_REQUEST";
export const LOAD_INGREDIENT_SUCCESS = "LOAD_INGREDIENT_SUCCESS";
export const LOAD_INGREDIENT_FAILURE = "LOAD_INGREDIENT_FAILURE";

export const CREATE_INGREDIENT_REQUEST = "CREATE_INGREDIENT_REQUEST";
export const CREATE_INGREDIENT_SUCCESS = "CREATE_INGREDIENT_SUCCESS";
export const CREATE_INGREDIENT_FAILURE = "CREATE_INGREDIENT_FAILURE";

export const DELETE_INGREDIENT_REQUEST = "DELETE_INGREDIENT_REQUEST";
export const DELETE_INGREDIENT_SUCCESS = "DELETE_INGREDIENT_SUCCESS";
export const DELETE_INGREDIENT_FAILURE = "DELETE_INGREDIENT_FAILURE";

/* 리듀서 선언 */

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        draft.user = action.data;
        break;

      case LOAD_SHOPPING_LIST_REQUEST:
        draft.state.loadShoppingListLoading = true;
        draft.state.loadShoppingListDone = false;
        draft.state.loadShoppingListError = null;
        break;
      case LOAD_SHOPPING_LIST_SUCCESS:
        draft.state.loadShoppingListLoading = false;
        draft.state.loadShoppingListDone = true;
        draft.state.loadShoppingListError = null;
        draft.shoppingList = action.data;
        break;
      case LOAD_SHOPPING_LIST_FAILURE:
        draft.state.loadShoppingListLoading = false;
        draft.state.loadShoppingListDone = false;
        draft.state.loadShoppingListError = action.error;
        break;

      case CREATE_SHOPPING_LIST_REQUEST:
        draft.state.createShoppingListLoading = true;
        draft.state.createShoppingListDone = false;
        draft.state.createShoppingListError = null;
        break;
      case CREATE_SHOPPING_LIST_SUCCESS:
        draft.state.createShoppingListLoading = false;
        draft.state.createShoppingListDone = true;
        draft.state.createShoppingListError = null;
        draft.shoppingList = action.data;
        break;
      case CREATE_SHOPPING_LIST_FAILURE:
        draft.state.createShoppingListLoading = false;
        draft.state.createShoppingListDone = false;
        draft.state.createShoppingListError = action.error;
        break;

      case DELETE_SHOPPING_LIST_REQUEST:
        draft.state.deleteShoppingListLoading = true;
        draft.state.deleteShoppingListDone = false;
        draft.state.deleteShoppingListError = null;
        break;
      case DELETE_SHOPPING_LIST_SUCCESS:
        draft.state.deleteShoppingListLoading = false;
        draft.state.deleteShoppingListDone = true;
        draft.state.deleteShoppingListError = null;
        draft.shoppingList = action.data;
        break;
      case DELETE_SHOPPING_LIST_FAILURE:
        draft.state.deleteShoppingListLoading = false;
        draft.state.deleteShoppingListDone = false;
        draft.state.deleteShoppingListError = action.error;
        break;

      case LOAD_CART_REQUEST:
        draft.state.loadCartLoading = true;
        draft.state.loadCartDone = false;
        draft.state.loadCartError = null;
        break;
      case LOAD_CART_SUCCESS:
        draft.state.loadCartLoading = false;
        draft.state.loadCartDone = true;
        draft.state.loadCartError = null;
        draft.cart = action.data;
        break;
      case LOAD_CART_FAILURE:
        draft.state.loadCartLoading = false;
        draft.state.loadCartDone = false;
        draft.state.loadCartError = action.error;
        break;

      case CREATE_CART_REQUEST:
        draft.state.createCartLoading = true;
        draft.state.createCartDone = false;
        draft.state.createCartError = null;
        break;
      case CREATE_CART_SUCCESS:
        draft.state.createCartLoading = false;
        draft.state.createCartDone = true;
        draft.state.createCartError = null;
        draft.cart.cart = action.data;
        break;
      case CREATE_CART_FAILURE:
        draft.state.createCartLoading = false;
        draft.state.createCartDone = false;
        draft.state.createCartError = action.error;
        break;

      case DELETE_CART_REQUEST:
        draft.state.deleteCartLoading = true;
        draft.state.deleteCartDone = false;
        draft.state.deleteCartError = null;
        break;
      case DELETE_CART_SUCCESS:
        draft.state.deleteCartLoading = false;
        draft.state.deleteCartDone = true;
        draft.state.deleteCartError = null;
        draft.cart.cart = action.data;
        break;
      case DELETE_CART_FAILURE:
        draft.state.deleteCartLoading = false;
        draft.state.deleteCartDone = false;
        draft.state.deleteCartError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default reducer;
