import { all, fork } from "redux-saga/effects";
import usersSuga from "./users";

export default function* rootSaga() {
  yield all([fork(usersSuga)]);
}