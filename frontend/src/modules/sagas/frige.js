import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {} from "../reducers/shopping";
import {
  ADD_FRIGE_FAILURE,
  ADD_FRIGE_REQUEST,
  ADD_FRIGE_SUCCESS,
  DELETE_FRIGE_FAILURE,
  DELETE_FRIGE_REQUEST,
  DELETE_FRIGE_SUCCESS,
  LOAD_FRIGE_FAILURE,
  LOAD_FRIGE_REQUEST,
  LOAD_FRIGE_SUCCESS,
  LOAD_RECIPE_FAILURE,
  LOAD_RECIPE_REQUEST,
  LOAD_RECIPE_SUCCESS,
} from "../reducers/frige";

function loadFrigeAPI(data) {
  return axios.get(`/frige/list`);
}

function* loadFrige(action) {
  try {
    const result = yield call(loadFrigeAPI, action.data);

    yield put({
      type: LOAD_FRIGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FRIGE_FAILURE,
      error: err.response.data,
    });
  }
}

function addFrigeAPI(data) {
  return axios.post(`/frige/list/`, data);
}

function* addFrige(action) {
  try {
    const result = yield call(addFrigeAPI, action.data);
    yield put({
      type: ADD_FRIGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_FRIGE_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteFrigeAPI(data) {
  return axios.delete(`/frige/list/${data}`);
}

function* deleteFrige(action) {
  try {
    const result = yield call(deleteFrigeAPI, action.data);

    yield put({
      type: DELETE_FRIGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_FRIGE_FAILURE,
      error: err.response.data,
    });
  }
}

function loadRecipeAPI(data) {
  return axios.get(`/frige/recipe/list`);
}

function* loadRecipe(action) {
  try {
    const result = yield call(loadRecipeAPI, action.data);

    yield put({
      type: LOAD_RECIPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_RECIPE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadFrige() {
  yield takeLatest(LOAD_FRIGE_REQUEST, loadFrige);
}

function* watchAddFrige() {
  yield takeLatest(ADD_FRIGE_REQUEST, addFrige);
}

function* watchDeleteFrige() {
  yield takeLatest(DELETE_FRIGE_REQUEST, deleteFrige);
}

function* watchLoadRecipe() {
  yield takeLatest(LOAD_RECIPE_REQUEST, loadRecipe);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadFrige),
    fork(watchAddFrige),
    fork(watchDeleteFrige),
    fork(watchLoadRecipe),
  ]);
}
