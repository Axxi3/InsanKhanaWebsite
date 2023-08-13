import React, { useState } from 'react'

export default function Card(props) {      
 
  const [credentials,setcredentials]=useState({
    Options:"half" , 
    
  })   
 
  const optionsArray = Object.keys(props.Array);   
  const priceArray = Object.values(props.Array).reverse();  
  const [price,setprice]=useState(priceArray[1])

  const changeValue=(event)=> { 
    setcredentials({...credentials,[event.target.name]:event.target.value})   
    const index= optionsArray.indexOf(credentials.Options) 
    console.log(index)
    if(index==-1) {   
      console.log("now")  
      console.log(priceArray[index+1])
      setprice(priceArray[index+1])  
    } 
    else { 
      setprice(priceArray[index])  
    }
   
    }  
    // const optionsArray = [""];

    const addtocart = () => {
      const item = {
        CategoryName: props.name,
        name: props.name,
        img: props.link,
        option: credentials.Options,
        price: price,
      };
    
      // Retrieve the existing cart array from local storage
      const cartItemsJSON = localStorage.getItem("cart");
      
      let cartItems = [];
    
      if (cartItemsJSON) {
        try {
          cartItems = JSON.parse(cartItemsJSON);
          if (!Array.isArray(cartItems)) {
            cartItems = []; // Reset to an empty array if not an array
          }
        } catch (error) {
          console.error("Error parsing cart items JSON:", error);
        }
      }
    
      // Add the new item to the cart array
      cartItems.push(item);
    
      // Store the updated cart array back in local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    };
    
    
    
    

  return (
    <div className='top'>
       <div className="card" style={{"width": "18rem"}}>
  <img src={props.link} alt="..." className='foodimg'/>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text">{props.description}</p>
    <div className="col-md-4 orderwidth">
    <select id="inputState" className="form-select orderwidth" name='Options' value={credentials.State} onChange={changeValue}>
     
      {optionsArray.map((option, index) => (
      <option key={index}>{option}</option>
    ))}
    </select>   
    <h3>{price}</h3>
  </div>    
  <button type="button" className="btn btn-outline-primary orderwidth" onClick={addtocart}>Add to cart</button>
  </div>
</div>
     </div>
  )
}
