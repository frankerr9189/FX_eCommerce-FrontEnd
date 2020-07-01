import React from 'react';
import Menu from './Menu';
import "../styles.css";

const Layout = ({
    title = "FX-Digital", 
    description = "eCommerce Platform", 
    className, 
    children}) => (
<div>
    <Menu sticky = "top"/>
<div className="jumbotron">
    <h2>{title}</h2>
    <p className="lead">{description}</p>
</div>
    <div className={className}>{children}</div>
</div>
);

export default Layout;