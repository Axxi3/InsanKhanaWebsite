import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Loading from '../component/Loading';

export default function Contactus() {  
    const [login, setLogin] = useState(false);    
    const [load,setload]=useState(false)
    const [credentials,setcredentials]=useState({
        name:"" , 
        email:"", 
        complain:"", 
       
      }) 

    useEffect(() => {
      const auth = localStorage.getItem('authToken');
  
      if (auth === null) {
        setLogin(false); // Set login to false when authToken is not present
        console.log(login); // This will still show the previous value of login (useState is asynchronous)
      } else {
        setLogin(true);  
        
        // This will show the previous value of login (useState is asynchronous)
      }
    }, []); // Empty dependency array means this effect runs only once on mount  

    const changeValue=(event)=> { 
        setcredentials({...credentials,[event.target.name]:event.target.value})  
        }  

const SubmitHogaya=async (e)=>{ 
    e.preventDefault()   
    setload(true)   
    const exist =await fetch ("http://localhost:5000/postcomplain",{ 
      method:"POST", 
      headers:{ 
        "Content-Type":"application/json"
      }, 
      body:JSON.stringify({ 
        name:credentials.name, 
        email:credentials.email, 
        complain:credentials.complain
      })
    })  

    const response =await exist.json() 
    if(response.success){   
      setload(false)  
      setcredentials({ 
        name:"" , 
        email:"", 
        complain:"", 
      })
      return;
    }  
    else {   
      setload(false)
      alert("Something went wrong")
    }
}


  return (  
    <div className='wholecs'>  
    <Navbar login={login}/>
    <div className='contactus'>   
    
<div className="leftcontact">
      <h1>Let's chat.<br/> Tell me more about <br/>your problem</h1>  
      <h4>Let us create something better together</h4>
</div>  
<div className="rightcontact"> 
<h3>Send us a message 🚀</h3>    
{load && ( 
          <div className="right centre"> 
              <Loading/>
          </div>
        )}    
        { !load && ( 
          <form className="form" onSubmit={SubmitHogaya}>

<div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Type your name"  name='name' value={credentials.name} onChange={changeValue} />
</div>

<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1"  name='email' value={credentials.email} onChange={changeValue} placeholder="name@example.com"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Explain your problem</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"  name='complain' value={credentials.complain} onChange={changeValue}></textarea>
</div>   
<div className="col-12 ">
    <button type="submit" className="btn btn-primary ">Submit</button>
  </div>
  
</form>
        )}

</div>
    </div>  
    </div>
  )
}
