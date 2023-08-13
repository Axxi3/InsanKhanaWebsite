import React, { useEffect, useState } from 'react'
import img from "./add.png"  
import img2 from "./minus.png"
export default function Cart(props) {  
    const [price,setprice]=useState(props.price)   
    const [quantity,setquantity]=useState(1)   
   
    const plus = () => {  
    
        setquantity(quantity + 1);  
       props.change(1,props.price)
       
      };
     
      useEffect(() => {
        console.log('Updated quantity:', quantity);
        setprice(props.price * quantity);
      }, [quantity]);
      const minus = () => {  
        if(quantity==1){ 
          setprice(props.price) 
          return;
        } 
          setquantity(quantity - 1);  
          props.change(0,props.price)
         
      };  
      const remove = async () => {
        try {
          const cartString = localStorage.getItem("cart");
          if (cartString) {
            const cartArray = JSON.parse(cartString); // Convert the string to an array
            const indexToRemove = props.index; // Index of the element to remove
            cartArray.splice(indexToRemove, 1); // Remove the element from the array
            localStorage.setItem("cart", JSON.stringify(cartArray)); // Update localStorage
            window.location.reload(); // Reload the page
          }
        } catch (error) {
          console.error("Error removing item:", error);
        }
      };
      
  return (  
   
     <div className='cart'> 
<img src={img} alt="" className='icons crossicon' onClick={remove}/>   

        <div className="leftcart"> 
        <img src={props.img} alt="" className='leftcart'/>
        </div>  
        <div className="rightcart"> 
        <h2>{props.name}</h2>  
        <p>{props.option}</p>   
        <div className="lowsec"> 
        <img src={img} alt="" className='icons' onClick={plus}/>   
        <span>{quantity}</span> 
        <img src={img2} alt="" className="icons" onClick={minus}/>
        </div>
        <h3>{price}</h3>
        </div>  
        
    </div>  
    
   
  )
}
