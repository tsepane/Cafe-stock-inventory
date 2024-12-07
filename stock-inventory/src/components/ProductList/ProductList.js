import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Ensure correct path to firebaseConfig
import { collection, getDocs } from 'firebase/firestore';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        console.log('Attempting to fetch products from Firestore...');
        
        const querySnapshot = await getDocs(collection(db, 'products'));
        console.log('Firestore querySnapshot:', querySnapshot);

        if (querySnapshot.empty) {
          console.log('No products found in the collection.');
          setError('No products found');
          setLoading(false);
          return;
        }

        const productList = [];
        querySnapshot.forEach((doc) => {
          console.log(`Product data for doc ${doc.id}:`, doc.data());
          productList.push({ id: doc.id, ...doc.data() });
        });

        // After fetching data
        console.log('Fetched productList:', productList);
        setProducts(productList);

      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
