import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_LACK_INGREDIENTS_FAILURE,
  ADD_LACK_INGREDIENTS_REQUEST,
  ADD_LACK_INGREDIENTS_SUCCESS,
  CREATE_CART_FAILURE,
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_SHOPPING_LIST_REQUEST,
  CREATE_SHOPPING_LIST_SUCCESS,
  DELETE_CART_FAILURE,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_SHOPPING_LIST_FAILURE,
  DELETE_SHOPPING_LIST_REQUEST,
  DELETE_SHOPPING_LIST_SUCCESS,
  LOAD_CART_FAILURE,
  LOAD_CART_REQUEST,
  LOAD_CART_SUCCESS,
  LOAD_SHOPPING_LIST_FAILURE,
  LOAD_SHOPPING_LIST_REQUEST,
  LOAD_SHOPPING_LIST_SUCCESS,
} from "../reducers/shopping";

function loadShoppingListAPI(data) {
  return axios.get(`/shopping/list`);
}

function* loadShoppingList(action) {
  try {
    const result = yield call(loadShoppingListAPI, action.data);

    yield put({
      type: LOAD_SHOPPING_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SHOPPING_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function createShoppingListAPI(data) {
  return axios.post(`/shopping/list/${data}`);
}

function* createShoppingList(action) {
  try {
    const result = yield call(createShoppingListAPI, action.data);

    yield put({
      type: CREATE_SHOPPING_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SHOPPING_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteShoppingListAPI(data) {
  return axios.delete(`/shopping/list/${data}`);
}

function* deleteShoppingList(action) {
  try {
    const result = yield call(deleteShoppingListAPI, action.data);

    yield put({
      type: DELETE_SHOPPING_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_SHOPPING_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadCartAPI(data) {
  return axios.get(`/shopping/cart/${data}`);
}

function* loadCart(action) {
  try {
    const result = yield call(loadCartAPI, action.data);

    yield put({
      type: LOAD_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CART_FAILURE,
      error: err.response.data,
    });
  }
}

function createCartAPI(data) {
  return axios.post(`/shopping/cart`, data);
}

function* createCart(action) {
  try {
    const result = yield call(createCartAPI, action.data);

    yield put({
      type: CREATE_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_CART_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteCartAPI(data) {
  return axios.delete(`/shopping/cart/${data}`);
}

function* deleteCart(action) {
  try {
    const result = yield call(deleteCartAPI, action.data);

    yield put({
      type: DELETE_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_CART_FAILURE,
      error: err.response.data,
    });
  }
}

function addLackIngredientsAPI(data) {
  return axios.post(`/shopping/ingredients/cart`, data);
}

function* addLackIngredients(action) {
  try {
    const result = yield call(addLackIngredientsAPI, action.data);

    yield put({
      type: ADD_LACK_INGREDIENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_LACK_INGREDIENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadShoppingList() {
  yield takeLatest(LOAD_SHOPPING_LIST_REQUEST, loadShoppingList);
}

function* watchCreateShoppingList() {
  yield takeLatest(CREATE_SHOPPING_LIST_REQUEST, createShoppingList);
}

function* watchDeleteShoppingList() {
  yield takeLatest(DELETE_SHOPPING_LIST_REQUEST, deleteShoppingList);
}

function* watchLoadCart() {
  yield takeLatest(LOAD_CART_REQUEST, loadCart);
}

function* watchCreateCart() {
  yield takeLatest(CREATE_CART_REQUEST, createCart);
}

function* watchDeleteCart() {
  yield takeLatest(DELETE_CART_REQUEST, deleteCart);
}

function* watchAddLackIngredients() {
  yield takeLatest(ADD_LACK_INGREDIENTS_REQUEST, addLackIngredients);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadShoppingList),
    fork(watchCreateShoppingList),
    fork(watchDeleteShoppingList),
    fork(watchLoadCart),
    fork(watchCreateCart),
    fork(watchDeleteCart),
    fork(watchAddLackIngredients),
  ]);
}
