import React, { useState } from 'react';
import { db } from '../../firebaseConfig'; // Import the db from firebaseConfig
import { collection, addDoc } from 'firebase/firestore';
import './ProductForm.css';  // Ensure you have this CSS file or update it accordingly

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [foodType, setFoodType] = useState(''); // Food type state
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Example validation
    if (!productName || !foodType || !price) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    try {
      // Add product to Firestore
      await addDoc(collection(db, 'products'), {
        name: productName,
        type: foodType,
        price: parseFloat(price),  // Ensure price is a number
      });

      // Clear the form after submission
      setProductName('');
      setFoodType('');
      setPrice('');

      // Display success message
      setSuccessMessage('Product added successfully!');

    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add New Product</h2>

      <div className="input-group">
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="food-type">Food Type</label>
        <input
          type="text"
          id="food-type"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          placeholder="Enter food type (e.g. Pizza, Burger)"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
      </div>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
