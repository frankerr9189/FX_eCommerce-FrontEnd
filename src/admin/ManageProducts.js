import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin';

const ManageProducts = () => {
    const [products, setProducts] = useState ([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setProducts(data)
            }
        });
    };
        const destroy = productId => {
            deleteProduct(productId, user._id, token).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    loadProducts()
                }
            });
        };

    useEffect(()=> {
        loadProducts();
    }, [])
    return(
        <Layout 
        title="Manage Products" 
        description="Perform CURD on products" 
        className="container-fluid">
        
        <div className="profile-orders" className="content-margined">
            {
                <table className="table">
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>View Details</th>
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => <tr key={i}>
                                <td>{p.name}</td>
                                <td>
                                <Link to={`/product/${p._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Product
                </button>
                </Link>
                                </td>
                                <td>
                                <Link to={`/admin/product/update/${p._id}`}>
                                <span className="badge badge-warning badge-pill">
                                    Update
                                </span>
                                </Link>
                                </td>
                                <td>
                                <span onClick={()=> destroy(p._id)} className="badge badge-danger badge-pill">
                                    Delete
                                </span>
                                </td>
                            </tr>)}
                        </tbody>
                </table>            }
        </div>
    
        </Layout>
        );
        
    };

    export default ManageProducts;