import React from "react";
import '../Login_Form/input.css';
const Input = (props) => {
    let inputElement = null;
    let cls = "input"
    if( props.touched && props.invalid){
          cls = "dInp";
    }
    inputElement =
        <input className={`${cls} ${ props.touched && props.invalid ? "danger": ""}`}
        {...props.elementConfig}
        style={{color : `${props.color}`}}
        onChange={(event) => props.changed(event, props.inputKey)}
        value={props.value} />
    return (
        <div className="inputDiv"> 
        {inputElement}    
        </div>
    )
}

export default Input;