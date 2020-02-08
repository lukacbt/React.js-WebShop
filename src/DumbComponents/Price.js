import React from "react"

export function Price(props){
    return(
        <div id="price">
            <br/>
            <p id="priceText">TOTAL PRICE: <strong> {props.delivery === "yes" ? props.totalPrice + 5 : props.totalPrice} EUR</strong></p>
        </div>
        )
}