import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar';  
import companyimg from './companyimg.png'
import Footer from '../component/Footer';

export default function Aboutus() {  
    const [login, setLogin] = useState(false);

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

  return (
    <div className='about'>
 <Navbar login={login}/>     
 
 <div className="heroforabout">  
 <div className="leftforabout"> 
 <div className="heroimg"> 
 <img src={companyimg} alt="" className='heroforaboutimg' />
 </div>

 </div>
 <div className="rightforabout">   
 <h1>ABOUT US</h1>
 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nam assumenda itaque iusto et facere excepturi blanditiis eum, molestias dicta rerum, inventore porro repellendus nisi omnis ab ratione, alias laudantium.
 Qui possimus animi ut tenetur nesciunt enim optio quia est corrupti quae, quidem expedita sapiente excepturi explicabo repellat earum sunt accusamus esse dignissimos, reiciendis id rem aut itaque quas. Perspiciatis?
 Officiis quia porro sequi maxime eaque aut repellat ad, dicta dolorum adipisci ipsa assumenda alias veritatis nulla quod praesentium debitis ducimus est nisi harum. Fugit nam assumenda placeat veniam magnam?
 Neque voluptas dolore iste nemo obcaecati totam minima, consequuntur atque a alias recusandae error, et sunt ullam illo nostrum soluta asperiores laborum quas doloribus velit molestias. Harum dolorem iste hic!
 Maxime suscipit est qui recusandae dolorum reiciendis, dicta itaque. Fugit deleniti ullam ex officiis aliquid odit eaque, consequuntur aliquam earum animi ipsum enim voluptatibus totam vero nisi velit dignissimos nulla.
 Fugit labore laudantium nesciunt sed quibusdam molestiae, magnam dolore autem totam recusandae vel! Dolore eos commodi beatae et fugit hic, quod ad sit esse!
 Beatae blanditiis sint voluptates unde maxime eveniet necessitatibus laudantium exercitationem porro magni est mollitia fuga laborum aut inventore eius, dolorum, delectus sed saepe expedita harum totam officia. Laboriosam, repudiandae enim?
 Omnis numquam blanditiis repudiandae nam deserunt exercitationem. Accusamus dolorem, totam labore architecto sequi voluptatum officiis tenetur unde aliquam quam in commodi, rerum voluptas quibusdam praesentium odio doloremque similique laudantium nam?</p>
 </div>
 </div>
<Footer/>
    </div>
  )
}
