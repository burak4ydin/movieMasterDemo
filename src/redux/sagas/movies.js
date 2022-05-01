import { takeEvery, put, all, fork, call } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../actions';

import {getMovies,getCats,getLikes} from "../actions/movieAction";

import {API_BASE} from "../../constants";







export function* getMoviesSaga(item){
    // let movieList;
    // yield axios.get(API_BASE(`/movie/${id}/lists`)).then(data=>{
    //     let newData={
    //         name,
    //         list:data.data
    //     }
    //     movieList=newData
    //
    // })
    yield put(getMovies(item))
}
export function* getCatsSaga(){
    try{
        let movis=[];
        let cats;

        yield axios.get(API_BASE('/genre/movie/list')).then(data=>{


            // for(let i=0;i<5;i++){
            //     setTimeout(()=>{
            //         if(cats.length>0){
            //
            //             let id =cats[i].id
            //             let name = cats[i].name
            //
            //
            //
            //         }
            //
            //     },500*i)
            // }
            cats = data.data.genres
        }).catch(e=>{
            console.log(e)
        })

        yield axios.get(API_BASE(`/movie/${cats[0].id}/lists`)).then((data)=>{

            let newData={
                name:cats[0].name,
                list:data.data
            }
            movis.push(newData)

        })
        yield axios.get(API_BASE(`/movie/${cats[1].id}/lists`)).then((data)=>{

            let newData={
                name:cats[1].name,
                list:data.data
            }
            movis.push(newData)

        })
        yield axios.get(API_BASE(`/movie/${cats[2].id}/lists`)).then((data)=>{

            let newData={
                name:cats[2].name,
                list:data.data
            }
            movis.push(newData)

        })
        yield axios.get(API_BASE(`/movie/${cats[3].id}/lists`)).then((data)=>{

            let newData={
                name:cats[3].name,
                list:data.data
            }
            movis.push(newData)

        })
        yield axios.get(API_BASE(`/movie/${cats[4].id}/lists`)).then((data)=>{

            let newData={
                name:cats[4].name,
                list:data.data
            }
            movis.push(newData)

        })
        yield put(getCats(movis))

     yield put(getMovies(movis))

    }catch(e){
        alert(e+"buradayım")
    }

}


export function* dashboardSagas() {
    yield all([call(getCatsSaga)]);
}
