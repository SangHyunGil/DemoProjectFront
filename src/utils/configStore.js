import rootSaga from '../sugas/rootSaga';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from '../reducers/rootReducer'
import ReduxThunk from 'redux-thunk'

export const configStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, ReduxThunk];
    const enhance = composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(rootReducer, enhance);
    sagaMiddleware.run(rootSaga);
  
    return store;
}