import { combineReducers } from "redux";
import filmreduser from "./films";
import ratingsreduser from "./reted";

const redusers = combineReducers( {films:filmreduser} );

export default redusers;