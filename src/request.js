import {API_BASE} from "./constants";
import axios from "axios";

export const fetchMovieData = (endpoint) => (
    axios.get(API_BASE(endpoint)).then(data => data.data).catch(e => e)
);
