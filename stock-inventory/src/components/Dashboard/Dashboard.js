import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';

const Dashboard = ({ products }) => {
    // Calculate total products and total stock
    const totalProducts = products ? products.length : 0;
    const totalStock = products
        ? products.reduce((total, product) => total + product.quantity, 0)
        : 0;

    // Get the most recently added products (e.g., top 3)
    const recentProducts = products ? products.slice(0, 3) : [];

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            
            {/* Display metrics */}
            <div className="dashboard-metrics">
                <div className="metric">
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>
                <div className="metric">
                    <h3>Total Stock</h3>
                    <p>{totalStock}</p>
                </div>
            </div>

            {/* Display recent products */}
            <div className="recent-products">
                <h3>Recently Added Products</h3>
                {recentProducts.length > 0 ? (
                    <ul>
                        {recentProducts.map((product) => (
                            <li key={product._id}>
                                <strong>{product.name}</strong> - {product.quantity} in stock
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent products available.</p>
                )}
            </div>
        </div>
    );
};

// Type checking for props
Dashboard.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ),
};

export default Dashboard;
