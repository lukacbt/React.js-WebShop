import React from "react"

export class EnterCoupons extends React.Component{

    addCoupon = () => {
        this.props.addPromotion(this.refs.coupon.value)
        this.refs.coupon.value = ""
    }
    
    render(){
        return(
        <div id="enterCoupon">
            <br/>
            <label id="basketOption">ENTER COUPON: </label>
            <input ref="coupon" type="text" />
            <button id="submitCouponBtn" onClick={this.addCoupon} >Submit</button>
            <span id="error"> {this.props.error} </span> <br/><br/>
            <label id="basketOption">FAST DELIVERY  <img id="delivery" src={require("../Images/delivery.png")} /> (5 EUR): </label>
            <span>Yes</span><input name="delivery" checked={this.props.delivery === "yes"} onChange={this.props.handleChange} value="yes" type="radio" /> 
            <span>No</span><input name="delivery" checked={this.props.delivery === "no"} onChange={this.props.handleChange} value="no" type="radio" />
        </div>
        )
    }
}