import './Rates.css'
import {useSelector,useDispatch} from "react-redux";
import { useEffect, useState } from 'react'; 
import {bindActionCreators} from "redux";
import {actionCreators} from '../state/action-creators/index';


function Rates() {
  const state =useSelector((state)=>state);
  const dispatch = useDispatch();
  const {add_rate,remove_rate} = bindActionCreators(actionCreators,dispatch);

  const setRate=(e)=>{
    add_rate([{name:e.target.name,rate:parseInt(e.target.value)}]);
  }

  const show_rate=()=>{
    return state.ratings.map((item)=>
    {
      return (
        <div className="card" key={item.name}>
          <img src={item.img}  className ="card-image" alt="Girl in a jacket" />
          <div className="card-info ">
              <h3>{item.name.split("_").slice(0, -1).join(" ")}</h3>
              <div className="rating" onChange={setRate}> 
              <input type="radio" name={item.name} value="5" className={item.name} id={"5"+item.name} checked={5===item.rate}/><label htmlFor={"5"+item.name}>☆</label> 
              <input type="radio" name={item.name} value="4" className={item.name} id={"4"+item.name} checked={4===item.rate}/><label htmlFor={"4"+item.name}>☆</label> 
              <input type="radio" name={item.name} value="3" className={item.name} id={"3"+item.name} checked={3===item.rate}/><label htmlFor={"3"+item.name}>☆</label>  
              <input type="radio" name={item.name} value="2" className={item.name} id={"2"+item.name} checked={2===item.rate}/><label htmlFor={"2"+item.name}>☆</label>  
              <input type="radio" name={item.name} value="1" className={item.name} id={"1"+item.name} checked={1===item.rate}/><label htmlFor={"1"+item.name}>☆</label> 
              </div>
             
          </div>

        </div>
      )
    })
  }

  return (
  
    <div className="Rates">
        {show_rate()}
    </div>
 
  );
}

export default Rates;
