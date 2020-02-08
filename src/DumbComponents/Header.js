import React from "react"

export function Header(props){
    return(
        <div id="header">
            <div id="logo">
                LOGO
            </div>
            <div>
                <span onClick={props.handleWebshopPage} className="navbar">WEBSHOP</span>
                <span style={{fontFamily:"verdana, sans-serif", padding:"0 20px"}}>|</span>
                <span onClick={props.handleBasketPage} className="navbar">CART ({props.data.basket.length})</span>
            </div>
        </div>
    )
}