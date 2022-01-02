import Login from './comps/Login';
import Home from './comps/Home';
import Films from './comps/Films';
import Wrap from './comps/Wrap';
import Header from './comps/Header';
import React, { useState ,useRef} from 'react';
import {BrowserRouter,Route,Link,Routes} from "react-router-dom"



function App() {

  const {login,setlogin} =useState(false);
  return (
    <BrowserRouter>

      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/login" element={<Login login = {login}/>}/>
          <Route path="/wrap/*" element={<Wrap/>}/>
        </Routes>
      
      </div>

    </BrowserRouter>
    
  );
}

export default App;
