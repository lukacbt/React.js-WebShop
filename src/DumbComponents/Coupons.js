import React from "react"

export class Coupons extends React.Component{

    removeCoupon = () => {
        this.props.removePromo(this.props.index)
    }

    render(){
        return <span> {this.props.coupon} <span id="couponX" onClick={this.removeCoupon} ><strong>X</strong></span> </span>
    }
}