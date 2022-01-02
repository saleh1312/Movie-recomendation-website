import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import './Header.css'
function Header() {
  return (
    <div className="Header">
      <h3>Welcome to arabian IMDB</h3>

      <div className="tooltib">
        <Link to="/" className="tte"> Home </Link>
        <Link to="/login" className="tte"> Login </Link>
      </div>
      
    </div>
  );
}

export default Header;
