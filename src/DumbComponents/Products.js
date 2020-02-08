import React from "react"

export class Products extends React.Component{

    handleInput = () => {
        this.props.handleInputChange(this.props.index, this.refs.quantity.value)
    }

    handleAdd = () => {
        this.props.handleAddToCart(this.props.index)
    }

    render(){
        return(
            <div id="product">
                <img src={this.props.product.src} />
                <p>Name: {this.props.product.name} </p>
                <p>Price: {this.props.product.price} EUR </p>
                <span id="quantity">Quantity: </span>
                <input 
                value={this.props.product.quantity}
                ref="quantity"
                id="quantityInput"
                type="number" 
                min="1"
                onChange={this.handleInput}
                />
                <p>Promotion:  <span style={this.props.product.promotion !== "None" ? {fontWeight:"bold"} : {fontWeight:"normal"}}>{this.props.product.promotion}</span></p>
                <div className="button">
                    <button onClick={this.handleAdd} className="btn">Add to cart</button>
                </div>
            </div>
        )
    }
}