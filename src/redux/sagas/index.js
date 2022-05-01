import {takeLatest, put, all, fork, call, takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/index';
import { getCatsSaga, dashboardSagas } from './movies';
import {GET_CATS} from "../actions/index";
import axios from "axios";
import {API_BASE} from "../../constants";
import {getCats, getMovies} from "../actions/movieAction";
import * as actions from "../actions";


export function* watchHome() {
    yield all([call(dashboardSagas)]);


}




