import React from "react"

export function Checkout(props){
    return(
        <div>
            <div className="line"></div>
            <div id="checkoutDiv">
                <p>Enter Your Information to Complete the Purchase:</p>
                <p><label>Your Address: </label><input onChange={props.handleChange} name="address" placeholder="Where do you live..." type="text" /><span id="error"> {props.data.addressError}</span></p>
                <p><label>Your E-mail: </label><input onChange={props.handleChange} name="email" placeholder="customer@email.com" type="text" /><span id="error"> {props.data.emailError}</span></p>
                <p><label>Your Credit Card Number: </label><input onChange={props.handleChange} name="creditCard" placeholder="0000 1111 2222 3333" type="text" /><span id="error"> {props.data.creditCardError}</span></p>
            </div>
        </div>
    )
}