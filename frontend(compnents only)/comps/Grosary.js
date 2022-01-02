import './Grosary.css'
import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select'
import  { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
import axios from 'axios'
import { useEffect, useState } from 'react'; 
import {bindActionCreators} from "redux";
import {actionCreators} from '../state/action-creators/index';

function Grosary(props) {
  let {gens,setgens,search,set_search, sr,ssr,st,stt} = props;
  const state =useSelector((state)=>state);
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const {add_films,remove_films} = bindActionCreators(actionCreators,dispatch);
 

  const [opts,setopts]=useState([
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Action', label: 'Action' },

    { value: 'Documentary', label: 'Documentary' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Family', label: 'Family' },
    { value: 'History', label: 'History' },
    { value: 'Fantasy', label: 'Fantasy' },

    { value: 'Horror', label: 'Horror' },
    { value: 'Music', label: 'Music' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Science Fiction', label: 'Science Fiction' },

    { value: 'TV Movie', label: 'TV Movie' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Western', label: 'Western' },
    { value: 'War', label: 'War' },
    

  ]);
  function get_reco(e)
  {
    var dict_rates = {}
    var dict_old_recos=[]
    state.films.map((item)=>{
      if(item.rate>0){
        dict_rates[item.name]=item.rate;
      }
      if(item.reco===true){
        dict_rates[item.name]=item.rate;
        dict_old_recos.push({name:item.name,rate:item.rate,reco:false})
 
      }
    })
    add_films(dict_old_recos);

    axios.post("http://127.0.0.1:5000/reco",{films:dict_rates}).then((response) => {
      let filmss=[]
      response.data.films.forEach((item)=> {
        
        let name = item
        let film= {name:name,rate:0,reco:true}

        
        filmss.push(film)


      })
      add_films(filmss);
     
    });
  }
  return (
    <div className="grosary">
      <Select options={opts} 
      isMulti 
      placeholder="select geners" 
      onChange={ 
        

        (e)=>{
        let filt = e.map((item)=>{return item.value})
        setgens(filt)
        } 
        }/>

      <div className="radio">
      <input type="radio" name="ser" value="and" checked={search==="and"} onChange={ (e)=>set_search(e.target.value) }/> <label>and</label> 
      <input type="radio" name="ser" value="or" checked={search==="or"} onChange={ (e)=>set_search(e.target.value) }/> <label >or</label> 
      </div>
      <input type="checkbox" onChange={()=>{ssr(!sr)}}/> <label className="show_rates">rated films</label> 
      <br/>
      <input type="checkbox" onChange={()=>{stt(!st)}}/> <label className="show_rates">recomended films</label> 
      <br/>
      <button className="reco-btn" disabled=
      {
        state.films.filter((i)=>{
    
          if (i.rate >0){
            return true
          }else{
            return false
          }
        }).length >=1?false:true

      } onClick={get_reco}>recomended films</button>
   
    </div>
  );
}

export default Grosary;
