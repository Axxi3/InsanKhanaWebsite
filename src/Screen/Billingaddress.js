import React, { useEffect, useState } from 'react'
import Leftinfo from '../component/Leftinfo'
import { isExpired, decodeToken } from "react-jwt";
import Loading from '../component/Loading';
export default function Billingaddress() {    
  const [login, setLogin] = useState(false);  
  const [loading,setLoading]=useState(true);
  const [credentials,setcredentials]=useState({
    name:"" , 
    email:"", 
    pass:"", 
    Address:"", 
    City:"", 
    State:""
  })     
  const [auth,setauth]=useState("")     
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);  
    console.log(isChecked)
  }; 
  
  const setdata = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/getuserinfo/${id}`);
      const data = await response.json();
      console.log(data);
     
      if(data.success){ 
        setLoading(false)
      }
        setcredentials({ 
          name:data.document.name, 
          email:data.document.email,
          Address:data.document.location
        }) // Update the state with fetched credentials data
      
    } catch (error) {
      console.error('Error fetching credentials:', error);
    }
  };

  
  useEffect(()=>{   
    let auth = localStorage.getItem('authToken');  
    let id=""
    // console.log(storedCartData)

    if (auth === null) {
      setLogin(false); // Set login to false when authToken is not present
      console.log(login); // This will still show the previous value of login (useState is asynchronous)
    } else {
      setLogin(true);  
      const myDecodedToken = decodeToken(auth);
      const isMyTokenExpired = isExpired(auth);  
      
      id=myDecodedToken.user.id 
      setauth(id)
      if(myDecodedToken!== null) { 
        // console.log(myDecodedToken.user.id)  
          // realtoken(myDecodedToken.user.id)
      }
    }    
    console.log("fhfhf",id)
    setdata(id)
  },[])




  
  const SubmitHogaya= async ()=>{     
    if(!isChecked){ 
      alert("Please agree to Terms & Condition")  
      return;
    }

    console.log(auth)
    const respo=await fetch("http://localhost:5000/updateuserinfo/"+auth,{ 
      method:"PUT" , 
      headers:{ 
        "Content-Type":"application/json"
      },   
      body:JSON.stringify({ 
        name:credentials.name, 
        email:credentials.email, 
        location:credentials.Address
      })
    }) 
    const response =await respo.json()  
    console.log(response)  
    if(response.success){ 
      window.location.reload();
    } else { 
      alert("Something went wrong")
    }
  }
  const changeValue=(event)=> { 
    setcredentials({...credentials,[event.target.name]:event.target.value})  
    }  
  return (
    <div className='heroinfo'>
    <Leftinfo/>  
    {loading && ( 
      <div className="rightforparentcart addressform"> 
      <Loading/>
      </div>
    )}  
    {!loading &&  (
     
     <div className="rightforparentcart addressform">     

     <div className="profile"> 
     <h1>Edit Your information</h1>
     </div>  

     <div className="form ">  
   
   <form className="row g-3" onSubmit={SubmitHogaya}>   
   <div className="mb-3">
 <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
 <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Type your name" name='name' value={credentials.name} onChange={changeValue}/>
</div>
 <div className="mb-3">
   <label htmlFor="inputEmail4" className="form-label" >Email</label>
   <input type="email" className="form-control" id="inputEmail4" placeholder='Type your e-Mail' name='email' value={credentials.email} onChange={changeValue}/>
 </div>
 
 <div className="col-12">
   <label htmlFor="inputAddress" className="form-label">Address</label>
   <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name='Address' value={credentials.Address} onChange={changeValue}/>
 </div>
 
 <div className="col-12">
   <div className="form-check">
     <input className="form-check-input" type="checkbox" id="gridCheck"  checked={isChecked}
          onChange={handleCheckboxChange}/>
     <label className="form-check-label" htmlFor="gridCheck">
       I agree to the Terms & conditions
     </label>
   </div>
 </div>
 <div className="col-12 ">
   <button type="submit" className="btn btn-primary ">Update Details</button>
 </div>
</form>  
</div> 
     </div> 
    )}
     </div> 
  )
}
