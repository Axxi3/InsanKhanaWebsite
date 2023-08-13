
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import Home from "./Screen/Home";
import Signup from "./Screen/Signup";
import Newuser from "./Screen/Newuser"
import Aboutus from "./Screen/Aboutus";
import Contactus from "./Screen/Contactus";

import MyProfile from "./component/Myprofile";
import Billingaddress from "./Screen/Billingaddress";
import Payment from "./Screen/Payment";
import ChangePass from "./Screen/ChangePass";
function App() {
  return (
  <>   
  <Router>   
  <Routes>
  <Route exact path="/" element={<Home/>} />    
  <Route exact path="/login" element={<Signup/>}/>  
  <Route exact path="/signup" element={<Newuser/>}/>   
  <Route exact path="/about" element={<Aboutus/>}/>   
  <Route exact path="/contactus" element={<Contactus/>}/>   
  <Route exact path="/cart" element={<MyProfile/>}/>  
  <Route exact path="/address" element={<Billingaddress/>}/>    
  <Route exact path="/pay" element={<Payment/>}/>  
  <Route exact path="/changepassword" element={<ChangePass/>}/>
  </Routes>  
 
  </Router>
  
  </>
  );
}

export default App;
