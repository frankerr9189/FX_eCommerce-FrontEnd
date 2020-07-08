import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';
import moment from 'moment';

const Orders = () =>{
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const {user, token} = isAuthenticated();

    const ordersToProcess = orders.filter(
        (order) => (order.status !== 'Completed' && order.status!== 'Cancelled'))
        
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(()=>{
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if(orders.length>0){
            return(
                <h1 className="text-danger">
                    Total Orders: {ordersToProcess.length}
                    </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}
                </div>
            </div>
            <input 
            type="text" 
            value={value} 
            className="form-control" 
            readOnly>
            </input>
        </div>
 );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if(data.error){
                console.log('Status update failed')
            }else{
                loadOrders();
            }
        });
    };
        
    const showStatus = (o) => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select 
            className="form-control" 
            onChange={e => handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                    {status}
                    </option>
                    ))};
            </select>
        </div>
    );
 
    return (
        <Layout title ="Orders" 
       // description = {`${name}` Manage below orders...}
        >
                {showOrdersLength()}
            <div className="profile-orders" className="content-margined">
            {
                <table className="table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Delivery Method</th>
                        <th>Status</th>
                        <th>Items</th>
                        </tr>
                        </thead>
                        <tbody>
                            {ordersToProcess.map((o, oIndex) => <tr key={oIndex}>
                                <td>{o._id}</td>
                                <td>{moment(o.createdAt).fromNow()}</td>
                                <td>{o.user.name}</td>
                                <td>{new Intl.NumberFormat("en-GB", {
                            style: "currency",
                            currency: "USD"
                        }).format(o.amount)}</td>
                                <td>{o.method}</td>
                                <td>{showStatus(o)}</td>
                                <td>
                                {o.products.map ((p, pIndex) => (
                                    <div 
                                    className="mb-4" 
                                    key={pIndex} 
                                    style={{
                                        padding: '10px', 
                                        border: '1px solid indigo'}}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product total', p.count)}
                                    </div>
                                ))}
                                </td>
                            </tr>)}
                        </tbody>
                </table>            }
        </div>
        </Layout>
    );
};
export default Orders;