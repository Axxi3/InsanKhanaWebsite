import React, { useEffect, useState } from 'react'
import PaymentCard from '../component/PaymentCard'
import Leftinfo from '../component/Leftinfo'  
import { isExpired, decodeToken } from "react-jwt";
import NotwrotePaymentinfo from '../component/NotwrotePaymentinfo'

export default function Payment() {    
  const [Exist,setExist]=useState()  
  const [doc,setdoc]=useState([])  
 
  useEffect(() => {
    let auth = localStorage.getItem('authToken');  
    const storedCartData = JSON.parse(localStorage.getItem('cart'));
    // console.log(storedCartData)

    if (auth === null) {
     return
    } else {
    
      const myDecodedToken = decodeToken(auth);
      const isMyTokenExpired = isExpired(auth);  
      // console.log(myDecodedToken)   
      // console.log(auth)
      // console.log(isMyTokenExpired)  
      if(myDecodedToken!== null) { 
        // console.log(myDecodedToken.user.id)  
          cardExists(myDecodedToken.user.id)
      }
    } }, []);
  const cardExists= async (id)=>{ 
    const respo= await fetch ("http://localhost:5000/getcard/"+id,{ 
    method:"GET"
    })   
    const response=await respo.json()  
    if(!response.success){ 
      setExist(false)  
      console.log(Exist)
    } else { 
      setExist(true)   
      console.log(Exist) 
      setdoc(response.doc)  
      console.log(doc)
    }
  }
  return (
    <div className='heroinfo'>  
     <Leftinfo/> 
     <div className="rightforparentcart addressform"> 
     {
      Exist==false && (
        <NotwrotePaymentinfo />
      )
     } 
     {
      Exist && (
        <PaymentCard name={doc.name} number={doc.number} type={doc.type}/>
      )
     }
     </div>
    </div>
  )
}
