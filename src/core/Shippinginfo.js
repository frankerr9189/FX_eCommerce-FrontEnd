import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart} from './cartHelpers';
import {guestShipping} from './apiCore';
import Checkout from './Checkout';

const Shippinginfo = () => {
    //guest shipping
    const [values, setValues] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        error: '',
        success: false
    });

    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=> {
        setItems(getCart());
    }, [run]);

    const {name, email, address, city, state, postalCode, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})
        guestShipping({name, email, address, city, state, postalCode})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    error: '',
                    success: true
                })
            }
        })
    };

    const shippingUpdate = (name, email, address, state, city, postalCode) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                type="text" 
                onChange={handleChange('name')} 
                className="form-conrtol" 
                value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                type="text" 
                onChange={handleChange('email')} 
                className="form-conrtol" 
                value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Address</label>
                <input 
                type="text" 
                onChange={handleChange('address')} 
                className="form-conrtol" 
                value={address}/>
            </div>
            <div className="form-group">
                <label className="text-muted">City</label>
                <input 
                type="text" 
                onChange={handleChange('city')} 
                className="form-conrtol" 
                value={city}/>
            </div>
            <div className="form-group">
                <label className="text-muted">State</label>
                <input 
                type="text" 
                onChange={handleChange('state')} 
                className="form-conrtol" 
                value={state}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Postal Code</label>
                <input 
                type="text" 
                onChange={handleChange('postalCode')} 
                className="form-conrtol" 
                value={postalCode}/>
            </div>
            <button  onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    return(
        <Layout 
        title="Shopping Cart" 
        description="Manage your cart. Add, remove or checkout." 
        className="container-fluid">
            
            <div className="row">
                    <h2 className="mb-4">Shipping Information</h2>
                    {shippingUpdate()}
            </div>
    
        </Layout>
        );
};
export default Shippinginfo;