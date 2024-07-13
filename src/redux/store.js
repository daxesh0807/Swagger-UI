import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import userReducer from "./userSlice";
import { userSaga } from "./userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([userSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
