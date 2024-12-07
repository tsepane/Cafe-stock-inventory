import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import Firebase login method
import { auth } from '../../firebaseConfig';  // Corrected import path for auth
import './Login.css';  // Your CSS file

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');  // Reset error on new submit attempt

    // Get the values of the input fields
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login Successful!');

      // Redirect to dashboard or another page on success
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
