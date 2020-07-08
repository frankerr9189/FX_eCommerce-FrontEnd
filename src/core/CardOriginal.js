import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem, updateItem, removeItem} from './cartHelpers';

const Card = ({
    product, 
    showViewProductButton = true, 
    showAddToCartButton= true,
    cartUpdate=false,
    showRemoveProductButton=false,
    setRun = f =>f, // default vaule of function
    run = undefined
}) => {
    const[redirect, setRedirect] = useState(false);
    const[count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Product
                </button>
                </Link>
            )
        );
    };

    const addToCart = () =>{
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
            <button 
            onClick={addToCart} 
            className="btn btn-outline-warning mt-2 mb-2 card-btn-1">
                            Add to cart
            </button>
        )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
            <button 
            onClick={()=> {
                removeItem(product._id);
                setRun(!run);// run useEffect in parent cart
            }}
            className="btn btn-outline-danger mt-2 mb-2"
            >
                            Remove Item
            </button>
        )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
        <span className="badge badge-primary badge-pill">In Stock</span>) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
            );
    };

    const handleChange = productId => event => {
        setRun(!run);//run useEffect in parent Cart
        setCount(event.target.value <1 ? 1: event.target.value);
        if(event.target.value >=1) {
            updateItem(productId, event.target.value)
        }
    };

    const showCartUpdateOptions = cartUpdate =>{
        return (
            cartUpdate && (
            <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Update Quantity</span>
                </div>
                {/* <input 
                type="number" 
                className="form-control" 
                value={count} 
                onChange={handleChange(product._id)}/> */}
                <select value={count} onChange={handleChange(product._id)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
            )
        );
    };

    return(
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <ShowImage item={product} url="product" />
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <p className="lead mt-2">
                        {product.description.substring(0, 10)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>   
                    {showStock(product.quantity)} 
                    <br></br>
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveButton(showRemoveProductButton)}
                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
    )
}
export default Card;