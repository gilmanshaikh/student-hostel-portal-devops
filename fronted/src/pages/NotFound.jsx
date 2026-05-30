import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>This link does not exist in HostelHub. You may have refreshed on a wrong URL or the page moved.</p>
      <div className="not-found-actions">
        <button type="button" onClick={() => navigate('/')}>
          Go home
        </button>
        <button type="button" className="secondary" onClick={() => navigate('/hostels')}>
          Browse hostels
        </button>
      </div>
    </div>
  );
};

export default NotFound;
