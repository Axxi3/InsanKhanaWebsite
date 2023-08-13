import React, { useState, useEffect } from 'react';

export default function Alert(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isVisible ? (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      {props.message}
     
    </div>
  ) : null;
}
