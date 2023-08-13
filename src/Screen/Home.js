import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Background from '../component/Background';
import Trust from '../component/Trust';
import Fooditems from '../component/Fooditems';
import Footer from '../component/Footer';

export default function Home() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('authToken');
console.log(auth)
    if (auth === null) {
      setLogin(false); // Set login to false when authToken is not present
      console.log(login); // This will still show the previous value of login (useState is asynchronous)
    } else {
      setLogin(true);  
      console.log(auth); 
      // This will show the previous value of login (useState is asynchronous)
    }
  }, []); // Empty dependency array means this effect runs only once on mount
  
  return (
    <>
      <Navbar login={login}/>
      <Background />
      <Trust />
      <Fooditems />  
      
    </>
  );
}
