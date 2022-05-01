import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import movieReducer from './reducers/movieReducer';
import {watchHome} from "./sagas";
import {composeWithDevTools} from "remote-redux-devtools";
const rootReducer = combineReducers(
    { movieMaster: movieReducer }
);
const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(sagaMiddleware)
const enhance = composeWithDevTools({
    realtime: true,
    host: 'localhost',
    port: 7979
});
const store = createStore(
    rootReducer,
    enhance(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(watchHome);

export default store;

