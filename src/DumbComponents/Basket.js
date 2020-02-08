import React from "react"

export class Basket extends React.Component{

    handleRemove = () => {
        this.props.handleRemoveBtn(this.props.index)
    } 

    handleChange = () => {
        this.props.handleInputChange(this.props.index, this.refs.basketInputQuantity.value)
    }

    conditionalPrice = () => {
        if(this.props.item.id === 1 && this.props.item.quantity >= 3){
            return Math.round((this.props.item.price * this.props.item.quantity - 9.97) * 100) / 100
        }else if(this.props.item.id === 3 && this.props.item.quantity >= 2){
            return Math.round((this.props.item.price * this.props.item.quantity - 4.98) * 100) / 100
        }else return Math.round(this.props.item.price * this.props.item.quantity * 100) / 100
    }

    render(){
        return(
            <div id="basketProduct">
                <div id="imgBasket">
                <img src={this.props.item.src} />
                </div>
                <div id="infoBasket">
                <p>
                    Name: {this.props.item.name} <br/>
                    Price: {this.conditionalPrice()} EUR <br/>
    
                <label>Quantity:</label> 
                <input 
                ref="basketInputQuantity"
                onChange={this.handleChange} 
                value={this.props.item.quantity} 
                min="1" 
                type="number" />
                </p>
                <span onClick={this.handleRemove} id="removeBtn">Remove</span>
                </div>
            </div>
        )
    }

}