import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart} from './cartHelpers';
import Card from './CardOriginal';
import Checkout from './Checkout';

const Shippinginfo = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=> {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items.</h2>
                <hr/>
                {items.map((product, i)=> (
                <Card 
                key ={i} 
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
                />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>Your cart is empty. <br/>
         <Link to="/shop">
             Continue Shopping...
             </Link>
        </h2>
    )

    return(
        <Layout 
        title="Shopping Cart" 
        description="Manage your cart. Add, remove or checkout." 
        className="container-fluid">
            
            <div className="row">
                <div className="col-5">
                <h1 className="mb-4">Your Cart Summary</h1>
                    <hr/>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
                <div className="col-7">
                    <h2 className="mb-4">Shipping Information</h2>
                </div>
            </div>
    
        </Layout>
        );
};
export default Shippinginfo;