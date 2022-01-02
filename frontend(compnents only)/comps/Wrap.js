import './wrap.css'
import Films from './Films';
import Grosary from './Grosary';
import Rates from './Rates';
import {BrowserRouter,Route,Link,Routes} from "react-router-dom"
import { useEffect, useState } from 'react'; 

function Wrap() {
  const [genrs_filter,set_genrs_filter]=useState([]);
  const [search,set_search]=useState("and");
  const [show_rated,set_show_rated]=useState(false);
  const [show_recomend,set_show_recomend]=useState(false);


  return (
  
    <div className="wrap">

        <Routes>
        
            <Route path="" element= {<Films gens={genrs_filter} search={search} sr={show_rated} st={show_recomend}/>}/>
            <Route path="rates" element= {<Rates/>}/>

        </Routes>

        <Grosary gens={genrs_filter} setgens={set_genrs_filter} search={search} set_search={set_search} sr={show_rated} ssr={set_show_rated}
        st={show_recomend} stt={set_show_recomend}/>
    </div>
 
  );
}

export default Wrap;
