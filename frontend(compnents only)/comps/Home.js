import  { useNavigate } from 'react-router-dom'
import './Home.css'
function Home() {


    const navigate= useNavigate();
    function handlesub(e)
    {
        navigate('/wrap',{replace:true});
    }
    return (
      <div className="Home">
        <h1> Hello to Home page</h1> 
        <button onClick={handlesub}>Click here to show films </button>
      </div>
    );
  }
  
  export default Home;
  