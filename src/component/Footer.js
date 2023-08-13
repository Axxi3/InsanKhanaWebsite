import React from 'react'
import insta from './instagram.svg'  
import fb from './facebook.svg'
import twitter from './twitter.svg'  
import discord from './discord.svg'
export default function Footer() {
  return (
    <div className='footer'>  
      <img src={insta} alt="" />
      <img src={fb}alt="" />
      <img src={twitter} alt="" />
      <img src={discord} alt="" />
    </div>
  );
}
