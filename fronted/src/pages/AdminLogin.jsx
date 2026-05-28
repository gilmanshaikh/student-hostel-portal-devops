import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await adminLogin(formData);
    if (result.token) {
      login(result.user, result.token);
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate('/admin/register')}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
