import React, { useState ,useRef} from 'react';
import './Login.css'
function Login(props) {

  
    const user = useRef();
    const pass = useRef();
    const label = useRef();

    function handleSubmit(e) 
    {
        e.preventDefault();
        let uu=user.current.value;
        let pp=pass.current.value;
        if (uu==="root" && pp==="root"){
            label.current.className="Valid";
            label.current.innerHTML="Valid";
            user.current.value=""
            pass.current.value=""
        }else{
            label.current.className="nonValid";
            label.current.innerHTML="non Valid";
            user.current.value=""
            pass.current.value=""
        }
        
    }
    
    return (
        <div className="Login">
            <form>
                <h3>User name</h3>
                <input ref={user} type="text"/>
                <h3>Password</h3>
                <input ref={pass} type="password"/>
                <br/>
                <h5 ref={label} className="normal">invlaid</h5>
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default Login;
