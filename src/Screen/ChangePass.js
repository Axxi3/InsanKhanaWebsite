import React, { useEffect, useState } from "react";
import Leftinfo from "../component/Leftinfo";
import { isExpired, decodeToken } from "react-jwt";
import Loading from "../component/Loading";  

export default function ChangePass() { 
  
  const [load,setload]=useState(false)
    const [credentials,setcredentials]=useState({
        CP:"" , 
        NP:"", 
        DP:""
      })   
      const[auth,setauth]=useState("")
      
      const changeValue=(event)=> { 
        setcredentials({...credentials,[event.target.name]:event.target.value})   
         
        }      
        useEffect(()=>{   
            let auth = localStorage.getItem('authToken');  
            let id=""
            // console.log(storedCartData)
        
            if (auth === null) {
             // This will still show the previous value of login (useState is asynchronous)
            } else {
             
              const myDecodedToken = decodeToken(auth);
              const isMyTokenExpired = isExpired(auth);  
              
              id=myDecodedToken.user.id 
              setauth(id)   
              console.log(id)
              if(myDecodedToken!== null) { 
                // console.log(myDecodedToken.user.id)  
                  // realtoken(myDecodedToken.user.id)
              }
            }    
           
            
          },[])

const SubmitHogaya= async (event)=>{   
  setload(true)      
  if(credentials.NP !== credentials.DP){ 
    alert("Both password don't match")    
    setload(false)
    return;
  }
  event.preventDefault();
    try {
        const response=await fetch("http://localhost:5000/changepassword/"+auth,{ 
    method:"POST", 
    headers: {
        "Content-Type": "application/json"
      }, 
      body:JSON.stringify({ 
        CP:credentials.CP  ,
        password:credentials.NP
      })
}) 
const respo= await response.json()      
console.log(respo)
if(respo.success){    
 
 alert(respo.alert)   
 setload(false)   
}  else { 
  alert(respo.alert)  
  setload(false) 
}
    } catch (error) {
      console.log(error)  
      setload(false) 
    }


}

  return (
    <div className="heroinfo">
      <Leftinfo />
      <div className="rightforparentcart addressform"> 
      { load && ( 
        <Loading/>
      )
      }  
      { 
      load==false && ( 
        <div className="form">  
   
        <form className="row g-3" onSubmit={SubmitHogaya}>   
        <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">Your Current Password</label>
      <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Your Current Password" name='CP' value={credentials.CP} onChange={changeValue}/>
     </div>  
     <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">Your New Password</label>
      <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Your New Password" name='NP' value={credentials.NP} onChange={changeValue}/>
     </div>  
     <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">Confirm Your New Password</label>
      <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Confirm Your New Password" name='DP' value={credentials.DP} onChange={changeValue}/>
     </div>  
      
      <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck"/>
          <label className="form-check-label" htmlFor="gridCheck">
            I agree to the Terms & conditions
          </label>
        </div>
      </div>
      <div className="col-12 ">
        <button type="submit" className="btn btn-primary ">Put my Card details</button>
      </div>
     </form>  
     </div> 
      )
      }
      
      </div>
    </div>
  );
}
