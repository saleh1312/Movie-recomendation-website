import './films.css'
import logo from '../data/negan.jpg';
import {useSelector,useDispatch} from "react-redux";
import { useEffect, useState } from 'react'; 
import {bindActionCreators} from "redux";
import {actionCreators} from '../state/action-creators/index';
import axios from 'axios'

function Films(props) {
  let {gens,search,sr,st} = props;
  const state =useSelector((state)=>state);
  const dispatch = useDispatch();
  const {add_films,remove_films} = bindActionCreators(actionCreators,dispatch);


  const load_com=useEffect(()=>{
  
      axios.get("http://127.0.0.1:5000/get_films").then((response) => {
      let filmss=[];
      response.data.films.forEach((item)=> {
        
        let name = item[0]
        let img = item[1]
        let genrs = item[2]
        let gens = genrs.split(",");
        let rate=0;
        let reco=false;
        let film= {name:name,img:img,genrs:gens,rate:rate,reco:reco}

        
        filmss.push(film)


      })
      add_films(filmss);
     
    });
    
  },[])

  function setGender(e,reco) {
   
    add_films([{name:e.target.name,rate:parseInt(e.target.value),reco:reco}]);
    
  }
  function remove_rate(name,reco) {
   
    add_films([{name:name,rate:0,reco:reco}]);
    
  }
  const show2=()=>{
    let filt_films = state.films.filter((item)=>{
      let stage1=1;

      if (gens.length>0)
      {
        let ge=gens.length;
        let exist_ge=0;
        for(let i =0;i<item.genrs.length;i++){
          for(let j =0;j<gens.length;j++){
            if (item.genrs[i]===gens[j]){
              exist_ge+=1;
            }
          }
        }

        if (search ==="or"){

          if (!(exist_ge >0)){
            stage1=0
          }
        }else{

          if (!(exist_ge === ge)){
            stage1=0
          }
        }
      }

      let stage2=1;
      if (sr===true){
        if(!(item.rate>0)){
          stage2=0
        }
      }


      let stage3=1;
      if (st===true){
        if(!(item.reco===true)){
          stage3=0
        }
      }

      if (stage1===1 && sr===false && st===false){
        return true
      }else if(stage1===1 && sr===true && st===false){
        if((item.rate>0)){
          return true
        }
      }else if(stage1===1 && sr===false && st===true){
        if((item.reco===true)){
          return true
        }
      }else if(stage1===1 && sr===true && st===true){
        if((item.reco===true) || (item.rate>0)){
          return true
        }
      }else{
        return false
      }

      




    })

    return filt_films.map((item)=>
    {
      return (
        <div className="card" key={item.name}>
          <img src={item.img}  className ="card-image" alt="Girl in a jacket" />
          <div className="card-info">
              <h3>{item.name.split("_").slice(0, -1).join(" ")}</h3>
              <div className="rating"> 
              <input type="radio" name={item.name} value="5" className={item.name} id={"5"+item.name} onChange={(e)=>setGender(e,item.reco)} checked={5===item.rate}/><label htmlFor={"5"+item.name}>☆</label> 
              <input type="radio" name={item.name} value="4" className={item.name} id={"4"+item.name} onChange={(e)=>setGender(e,item.reco)} checked={4===item.rate}/><label htmlFor={"4"+item.name}>☆</label> 
              <input type="radio" name={item.name} value="3" className={item.name} id={"3"+item.name} onChange={(e)=>setGender(e,item.reco)} checked={3===item.rate}/><label htmlFor={"3"+item.name}>☆</label>  
              <input type="radio" name={item.name} value="2" className={item.name} id={"2"+item.name} onChange={(e)=>setGender(e,item.reco)} checked={2===item.rate}/><label htmlFor={"2"+item.name}>☆</label>  
              <input type="radio" name={item.name} value="1" className={item.name} id={"1"+item.name} onChange={(e)=>setGender(e,item.reco)} checked={1===item.rate}/><label htmlFor={"1"+item.name}>☆</label> 
              </div>
              
          </div>
          <div className="del" onClick={()=>remove_rate(item.name,item.reco)}>X</div>
          <div className={item.reco?"recommended":"notrecommended"}>Recommended</div>
      
        </div>
      )
    })

  }


  return (
 
    <div className="films">
      {show2()}
   
    </div>

  );
}

export default Films;
