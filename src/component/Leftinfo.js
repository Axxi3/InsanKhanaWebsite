
import React, { useEffect, useState } from 'react'
 
import { NavLink } from 'react-router-dom';
import { useJwt,isExpired, decodeToken } from "react-jwt";

export default function Leftinfo() {    
    const [login, setLogin] = useState(false);
    const [details,setdetails]=useState({ 
        name:"", 
        pfp:""
      })  
      const realtoken=async (token)=>{ 
        let check=await fetch(`http://localhost:5000/search/`+token,{ 
          method:"GET", 
        })
        const response=await check.json()
        // console.log(response.data)  
        setdetails({ 
          name:response.data[0].name, 
          pfp:response.data[0].pfp
        })
      }
      useEffect(() => {
        let auth = localStorage.getItem('authToken');  
        const storedCartData = JSON.parse(localStorage.getItem('cart'));
        // console.log(storedCartData)
    
        if (auth === null) {
          setLogin(false); // Set login to false when authToken is not present
          console.log(login); // This will still show the previous value of login (useState is asynchronous)
        } else {
          setLogin(true);  
          const myDecodedToken = decodeToken(auth);
          const isMyTokenExpired = isExpired(auth);  
          // console.log(myDecodedToken)   
          // console.log(auth)
          // console.log(isMyTokenExpired)  
          if(myDecodedToken!== null) { 
            // console.log(myDecodedToken.user.id)  
              realtoken(myDecodedToken.user.id)
          }
        }  
       
    
      }, []); // Empty dependency array means this effect runs only once on mount
    
    
  return (
    
          <div className="left centre" style={{"flexDirection":"column", "justifyContent":"flex-start", "gap":"30px","padding-top":"30px"}}>  
         <img src={details.pfp} alt="" className='dis'/> 
         <h2>{details.name}'s PROFILE</h2>  
          


         <div className="listofoptions "> 
         <ul>
            <li className='activeddetails'><NavLink  exact to="/cart">Personal details</NavLink></li>
            <li><NavLink  exact to="/address">Edit info</NavLink></li>
            <li><NavLink  exact to="/pay">Payment Methods</NavLink></li>
            <li><NavLink  exact to="/changepassword">Change password</NavLink></li>
         </ul>
         </div>
         </div>  
   
  )
}
