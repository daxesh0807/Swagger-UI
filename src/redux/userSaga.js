import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "./userSlice";
import { useCookies } from "react-cookie";

function* fetchUser() {
  try {
    // Get the session ID from cookies
    const [cookies] = useCookies(["sessionID", "universalID"]);

    console.log("cookies::::::::::", cookies)

    if (!cookies?.sessionID) {
      throw new Error("Session ID not found in cookies");
    }

    // Define the API URL
    const apiUrl =
      "https://pazuru-com-api.stage.norway.everymatrix.com/v1/player/session/player";

    // Define the request options
    const requestOptions = {
      method: "GET",
      headers: {
        "X-SessionId": cookies.sessionID,
        "Content-Type": "application/json",
      },
    };

    // Make the API call
    const response = yield call(fetch, apiUrl, requestOptions);

    // Check if the response is ok
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
