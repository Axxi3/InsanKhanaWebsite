import React from 'react'
import baat from './testemonies.png'
export default function Trust() {
  return (
   <> 
    <h1 className='trusted text'>Some of our testemonials</h1>   
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner flexer slider">
  
      <img src={baat} className="d-block w-100 size" alt="..."/>
      <img src={baat} className="d-block w-100 size" alt="..."/>
      <img src={baat} className="d-block w-100 size" alt="..."/>
   
    
 
      <img src={baat} className="d-block w-100 size" alt="..."/>
   
  </div>
</div>
   </>
  )
}
