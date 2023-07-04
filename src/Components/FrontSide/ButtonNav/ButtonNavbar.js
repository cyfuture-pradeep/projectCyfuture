import React from 'react';
import   './ButtonNav.css'

export default function ButtonNavbar(props) {
  return <div>
      <button onClick={props.click} className="btn">{props.content}</button>
  </div>;
}
