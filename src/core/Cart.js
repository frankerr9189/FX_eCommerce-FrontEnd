import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart} from './cartHelpers';
import Card from './CardOriginal';
import Checkout from './Checkout';

const Cart = () => {
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
                <Link className="nav-link" 
                to="/shop">
                    <button className="btn btn-primary">Add more items

                    </button>
                    </Link>

                    {items.length>0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-7">
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr/>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
    
        </Layout>
        );
};
export default Cart;