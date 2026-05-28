import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminRegister } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await adminRegister(formData);
    if (result.token) {
      login(result.user, result.token);
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Registration</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        <p className="auth-link">
          Already have an account? <span onClick={() => navigate('/admin/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
