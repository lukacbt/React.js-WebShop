import React from "react"
import { Header } from "../DumbComponents/Header"
import { PromoBanner } from "../DumbComponents/PromoBanner"
import { Products } from "../DumbComponents/Products"
import { Basket } from "../DumbComponents/Basket"
import { storeProducts } from "../storeProducts"
import { Price } from "../DumbComponents/Price"
import { EnterCoupons } from "../DumbComponents/EnterCoupons"
import { Coupons } from "../DumbComponents/Coupons"
import { Checkout } from "../DumbComponents/Checkout"


export class WebshopSmart extends React.Component{
    state = {
        products: storeProducts,
        basket: [],
        page: "webshop",
        promoBanner: "on",
        totalPrice: null,
        promo: [],
        promoError: "",
        delivery:"no",
        checkout: "",
        address: "",
        addressError:  "",
        email: "",
        emailError: "",
        creditCard: "",
        creditCardError: ""
    } 

    //NAVIGACIJA PO STRANICI
    handleWebshopPage = () => {
        this.setState({ page: "webshop" })
    }
    
    handleBasketPage = () => {
        this.setState({ page: "basket" })
    }

    handleCheckoutPage = () => {
        this.setState({ checkout:"checkout" })
    }

    handlePromoBanner = () => {
        this.setState({ promoBanner:"off" })
    }


    //DODAVANJE I IZBACIVANJE IZ KOŠARICE
    handleAddToCart = (i) => {
        let product = storeProducts[i]
        let newArr = this.state.basket
        newArr.push(product)
        this.setState({ basket: newArr })
        this.handleTotalPrice()
    }

    handleRemoveBtn = (i) => {
        let arr = this.state.basket
        arr.splice(i, 1)
        this.setState({ basket:arr })
        this.handleTotalPrice()
        if(this.state.basket.length < 1){
            this.setState({ promo: [], checkout:"" })
        }
    }

    //PROMJENA KOLIČINE PROIZVODA
    handleInputChange = (i, newQuantity) => {
        let arr = this.state.products
        if(newQuantity < 1){
            newQuantity = 1
        }else{
            arr[i].quantity = newQuantity
        }
        this.setState({ products:arr })
        this.handleTotalPrice()
    }

    handleInputChangeBasket = (i, newQuantity) => {
        let arr = this.state.basket
        if(newQuantity < 1){
            newQuantity = 1
        }else{
            arr[i].quantity = newQuantity
        }
        this.setState({ basket:arr })
        this.handleTotalPrice()
    }

    //IZRAČUN UKUPNE CIJENE
    handleTotalPrice = () => {
        let coupons = this.state.promo
        let total = 0
        let arr = this.state.basket

    //izračun cijene bez promocija
        for(let i = 0; i < arr.length; i++){
            total = total + arr[i].price * arr[i].quantity      
        }

    //provjera i izračun cijena nakon promocija po komadu proizvoda
        for(let i = 0; i < arr.length; i++){
            if(arr[i].id === 1 && arr[i].quantity >= 3){
                total = total - 9.97            
            }else if(arr[i].id === 3 && arr[i].quantity >= 2){
                total = total - 4.98           
            }
        }

    //provjera ima li kupona te izračun cijena uz kupone
        for(let i = 0; i < coupons.length; i++){
            if(coupons[i] === "20%OFF"){
                total = total * 0.80               
            }else if(coupons[i] === "5%OFF"){
                total = total * 0.95   
            }else if(coupons[i] === "20EUROFF"){
                total = total - 20  
            }
        }

        total = Math.round(total * 100) / 100
        this.setState({ totalPrice: total })
    }

    //VALIDACIJA KUPONA KOJI SE NE MOŽE KOMBINIRATI
    validateCoupon = () => {
        let coupons = this.state.promo
        for(let i = 0; i < coupons.length; i++){
            if(coupons[i] === "20%OFF"){
                return true
            }
        }
        return false
    }
    
    //UNOS I IZBACIVANJE KUPONA
    addPromotion = (coupon) => {
        let arr = this.state.promo
        if(this.state.promo.length === 0 && coupon === "20%OFF"){
            arr.push(coupon)
            this.setState({ promo: arr })
            this.handleTotalPrice()
        }else if(this.validateCoupon() === false && coupon === "5%OFF"){
            arr.push(coupon)
            this.setState({ promo:arr })
            this.handleTotalPrice()
        }else if(this.validateCoupon() === false && coupon === "20EUROFF"){
            arr.push(coupon)
            this.setState({ promo:arr })
            this.handleTotalPrice()
        }else {
            this.setState({ promoError: "Entered coupon cannot be applied!" })
            setTimeout(() => {
               this.setState({ promoError: ""}) 
            }, 1200);
        }
    }

    removePromotion = (i) => {
        let promos = this.state.promo
        promos.splice(i, 1)
        this.setState({ promo: promos })
        this.handleTotalPrice()
    }

    //VALIDACIJA PODATAKA IZ CHECKOUTA I KUPNJA
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    validateCheckout = () => {
        const emailTest = /^[\w+\-*_*.*+*]+\w*@[\w\-+_]+\.\w{2,4}\.*\w*$/
        const creditCardTest = /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/
        let emailErr = ""
        let creditCardErr = ""
        let addressErr = ""

        if(this.state.address === ""){
            addressErr = "Please provide you address"
        }
        if(!emailTest.test(this.state.email)){
            emailErr = "Did you enter correct email address?"
        }
        if(!creditCardTest.test(this.state.creditCard)){
            creditCardErr = "Please enter correct credit card number"
        }
        if(emailErr || creditCardErr || addressErr){
            this.setState({ addressError: addressErr, emailError: emailErr, creditCardError: creditCardErr })
            setTimeout(() => {
                this.setState({ addressError:"", creditCardError:"", emailError:"" }) 
             }, 2000);
            return false
        }else{
            this.setState({ addressError:"", creditCardError:"", emailError:"" })
            return true
        }
    }

    handleCheckout = () => {
        let arr = this.state.products
        if(this.validateCheckout() === true){
            alert("You completed your order!")
            for(let i = 0; i < arr.length; i++){
                arr[i].quantity = 1
            }
            this.setState({ basket: [], promoBanner:"on", address:"", email:"", creditCard:"", promo: [], checkout:"", products: arr })
        }
    }

    //MAPPING ARRAYS PRIKAZ
    mappingProducts = (product, i) => {
        return (<Products 
        handleInputChange={this.handleInputChange}
        handleAddToCart={this.handleAddToCart}
        product={product} 
        index={i}
        key={i} />)
    }

    mappingBasket = (item, i) => {
        return (<Basket 
        handleInputChange={this.handleInputChangeBasket} 
        handleRemoveBtn={this.handleRemoveBtn} 
        item={item}
        index={i} 
        key={item.id} />)
    }

    mappingCoupons = (coupon, i) => {
        return (<Coupons 
        removePromo={this.removePromotion} 
        coupon={coupon} 
        key={i} 
        index={i} />)
    }

    //CONDITIONAL PRIKAZ
    rendering = () => {
        if (this.state.page === "webshop"){
            return(
                <div id="store">
                    {this.state.products.map(this.mappingProducts)}
                </div>
            )
        }else if (this.state.page === "basket"){
            if(this.state.basket.length < 1){
                return <div style={{backgroundColor:"white"}} id="basketCenter">
                    <img style={{marginBottom: "20px"}} src="https://i.ibb.co/n3nJbm8/empty1.png" /><br/>
                    <span onClick={this.handleWebshopPage} id="continue">Continue shopping</span>
                </div>
            }else{
                return (
                    <div style={{backgroundColor: "whitesmoke"}} id="basketCenter">
                        {this.state.basket.map(this.mappingBasket)}
                        <div className="line"></div>
                        <EnterCoupons delivery={this.state.delivery} handleChange={this.handleChange} error={this.state.promoError} addPromotion={this.addPromotion} />
                        {this.state.promo.length > 0 ? <p id="priceText" >ENTERED COUPONS: {this.state.promo.map(this.mappingCoupons)}</p> : null}
                        <Price 
                        delivery={this.state.delivery}
                        promotions={this.state.promo}
                        totalPrice={this.state.totalPrice}/>
                        {this.state.checkout === "checkout" ? <Checkout data={this.state} handleChange={this.handleChange} /> : null}
                        <div className="line" ></div>
                        {this.state.checkout === "checkout" ? <button onClick={this.handleCheckout} id="checkoutBtn">BUY NOW</button> : <button onClick={this.handleCheckoutPage} id="checkoutBtn">CHECK OUT</button>}
                        <div style={{marginBottom:"0"}} className="line" ></div>
                    </div>
                )
            }
        }
    }

    render(){
        return(
            <div>
                <Header
                data={this.state} 
                handleWebshopPage={this.handleWebshopPage} 
                handleBasketPage={this.handleBasketPage}
                />
                {this.state.promoBanner === "on" ? <PromoBanner handlePromoBanner={this.handlePromoBanner} /> : null}
                <div style={this.state.promoBanner === "off" ? {paddingTop:"100px"} : {paddingTop:"20px"}} id="webshop">
                    {this.rendering()}
                </div>
            </div>
        )
    }
}