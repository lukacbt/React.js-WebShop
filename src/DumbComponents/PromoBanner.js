import React from "react"

export function PromoBanner(props){
    return(
        <div id="promoBanner">
            <span>Available coupons: <span onClick={props.handlePromoBanner} id="removeBanner" >X</span> <br/> 20%OFF (cannot be combined) | 5%OFF | 20EUROFF</span>
        </div>
    )
}