import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "./userSlice";
import Cookies from "js-cookie";

function* fetchUser() {
  try {
    const sessionId = Cookies.get("sessionID");

    if (!sessionId) {
      throw new Error("Session ID not found in cookies");
    }

    const apiUrl =
      "https://pazuru-com-api.stage.norway.everymatrix.com/v1/player/session/player";

    const requestOptions = {
      method: "GET",
      headers: {
        "X-SessionId": sessionId,
      },
    };

    const response = yield call(fetch, apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = yield response.json();
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

export function* userSaga() {
  yield takeLatest(fetchUserStart.type, fetchUser);
}
