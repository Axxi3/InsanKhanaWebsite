import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import Tick from '../component/Tick'  
import { useNavigate } from 'react-router-dom';
import Loading from '../component/Loading';
import Alert from '../component/Alert';
import DOMPurify from 'dompurify';
export default function Newuser() {     
  const [youexist,setyouexist]=useState(false) 
  const [load,setload]=useState(false)  
 
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [credentials,setcredentials]=useState({
    name:"" , 
    email:"", 
    pass:"", 
    Address:"", 
    City:"", 
    State:""
  }) 

    const optionsArray = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
      ];  


      function extractImgSrcFromApiResponse(apiResponse) {
        // Sanitize the HTML to prevent XSS attacks
        const sanitizedHtml = DOMPurify.sanitize(apiResponse);
      
        // Create a temporary div element to hold the sanitized HTML and parse it
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sanitizedHtml;
      
        // Find the 'img' tag within the temporary div
        const imgTag = tempDiv.querySelector('img');
      
        // Extract the 'src' attribute value
        if (imgTag) {
          const srcAttribute = imgTag.getAttribute('src');
          return srcAttribute;
        } else {
          return null; // If 'img' tag not found, return null or any other default value you prefer
        }
      }
      async  function pfpgenerator  () {  
        console.log("functioon called");  
       
        const url = 'https://any-anime.p.rapidapi.com/anime/img';
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '41c298d452msh44f4170619cd502p1536cfjsn3a0bccff1db3',
            'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
          }
        };
        
        try {
          const response = await fetch(url, options);
          const result = await response.text();  
          console.log("yaha tak hua")  
          const link2 = await extractImgSrcFromApiResponse(result)
          console.log(link2);  
          return link2;
        } catch (error) {
          console.error(error);
        }
      };



      const SubmitHogaya= async (e)=> {    
        setload(true)   
        console.log(load)   
        e.preventDefault();    
        const link= await pfpgenerator()
await console.log("this is linl",link)  

        const exists = await fetch("http://localhost:5000/userexist",{ 
          method:"POST", 
          headers:{ 
            "Content-Type":"application/json"
          }, 
          body:JSON.stringify({ 
            email:credentials.email
          })  
         
        }) 

        const response= await exists.json()  
        console.log(response.success)
        if(response.success) {   
          setload(false)
              setyouexist(true)  
              return;
        }

        console.log("Ho gyaya generate")
        console.log(youexist)

        const repose = await fetch("http://localhost:5000/createuser",{   
          method:"POST",
          headers:{ 
            "Content-Type":"application/json"
          }, 
          body:JSON.stringify({ 
            name:credentials.name, 
            pass:credentials.pass, 
            email:credentials.email,   
            pfp:link,
            location:credentials.Address+","+credentials.City+","+credentials.State
          })
        })  
       const res=await repose.json() 
        console.log(res)    
        

if(!res.success) { 
alert("Enter valid credentials")
} else { 
  setSuccess(true);   
  setload(false)
}

       } 
      
const changeValue=(event)=> { 
setcredentials({...credentials,[event.target.name]:event.target.value})  
}  


const justlogin=()=> {   
  setTimeout(() => {
    navigate('/login');
  }, 2300);
}

  return (
    <div className='signdiv'>  
     {/* agar true hua toh gayab kardo */}
        {!success && (  <div className="left centre">          
        
        </div>  )}   

        {load && ( 
          <div className="right centre"> 
              <Loading/>
          </div>
        )}

        {!success && !load && ( <div className="right centre">    

            {youexist && ( <Alert message="User exists, please try to login"/>)}
        

        <h1 className='topcentre'>Create your account</h1>   
    <p> Hello there! please fill your details</p>     
   <div className="form">  
   
    <form className="row g-3" onSubmit={SubmitHogaya}>   
    <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Type your name" name='name' value={credentials.name} onChange={changeValue}/>
</div>
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label" >Email</label>
    <input type="email" className="form-control" id="inputEmail4" placeholder='Type your e-Mail' name='email' value={credentials.email} onChange={changeValue}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4" placeholder='Type your password' name='pass' value={credentials.pass} onChange={changeValue}/>
  </div>
  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name='Address' value={credentials.Address} onChange={changeValue}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">City</label>
    <input type="text" className="form-control" id="inputCity" name='City' value={credentials.City} onChange={changeValue}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">State</label>
    <select id="inputState" className="form-select" name='State' value={credentials.State} onChange={changeValue}>
      <option selected>Choose...</option>
      {optionsArray.map((option, index) => (
      <option key={index}>{option}</option>
    ))}
    </select>
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
    <button type="submit" className="btn btn-primary ">Sign in</button>
  </div>
</form>  
</div>   
<div className="newuser"> 
<p><NavLink exact to="/login">Have an account?Click here</NavLink></p>
</div>
        </div>)}  

        {success && ( 
          <div className="right centre tick"> 
          <Tick/>
          </div>
        )}  
        {success && justlogin()}  

      
    </div>
  )
}
