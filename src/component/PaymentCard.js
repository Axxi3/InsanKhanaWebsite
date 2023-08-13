import React from 'react';
import logo from "../Screen/visa.png";

function splitNumberIntoGroups(number) {
  const numberString = String(number);
  const groups = [];

  for (let i = 0; i < numberString.length; i += 4) {
    groups.push(numberString.substr(i, 4));
  }

  return groups.join(' ');
}

export default function PaymentCard(props) {
  const formattedNumber = splitNumberIntoGroups(props.number);

  return (
    <div className='Paymentcard'>
      <div className="upSectionOfCard">
        <img src={logo} alt="visa" className="logo" />
        <p>{props.name}</p>
      </div>
      <div className="number">
        <p>{formattedNumber}</p>
      </div>
    </div>
  );
}
