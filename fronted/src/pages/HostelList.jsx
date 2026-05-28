import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaUsers, FaSearch, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { getAllHostels, getStudentApplications } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './HostelList.css';

const HostelList = () => {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sortBy: ''
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [hostels, searchTerm, filters]);

  const fetchData = async () => {
    const hostelsData = await getAllHostels();
    setHostels(hostelsData);
    setFilteredHostels(hostelsData);
    
    // Fetch student applications if logged in as student
    if (user && user.role === 'student') {
      const appsData = await getStudentApplications();
      setApplications(appsData);
    }
    
    setLoading(false);
  };

  const getApplicationStatus = (hostelId) => {
    if (!user || user.role !== 'student') return null;
    const application = applications.find(app => app.hostelId._id === hostelId);
    return application ? application.status : null;
  };

  const applyFilters = () => {
    let result = [...hostels];

    // Search filter
    if (searchTerm) {
      result = result.filter(hostel =>
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    if (filters.minPrice) {
      result = result.filter(hostel => hostel.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(hostel => hostel.price <= Number(filters.maxPrice));
    }

    // Sort
    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'capacity-high') {
      result.sort((a, b) => b.capacity - a.capacity);
    } else if (filters.sortBy === 'capacity-low') {
      result.sort((a, b) => a.capacity - b.capacity);
    }

    setFilteredHostels(result);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      minPrice: '',
      maxPrice: '',
      sortBy: ''
    });
  };

  if (loading) return <div className="loading">Loading hostels...</div>;

  return (
    <div className="hostel-list-container">
      <div className="hostel-list-header">
        <h2>Available Hostels</h2>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <form onSubmit={handleSearch} className="search-bar">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>

          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Min Price</label>
              <input
                type="number"
                placeholder="Min ₹"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="filter-select"
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">Max Price</label>
              <input
                type="number"
                placeholder="Max ₹"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="filter-select"
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="filter-select"
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="capacity-high">Capacity: High to Low</option>
                <option value="capacity-low">Capacity: Low to High</option>
              </select>
            </div>
          </div>

          {(searchTerm || filters.minPrice || filters.maxPrice || filters.sortBy) && (
            <button onClick={clearFilters} className="clear-filters">
              Clear All Filters
            </button>
          )}
        </div>

        <div className="results-count">
          Showing {filteredHostels.length} of {hostels.length} hostels
        </div>
      </div>

      <div className="hostel-grid">
        {filteredHostels.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6C738A' }}>
            No hostels found matching your criteria
          </div>
        ) : (
          filteredHostels.map(hostel => {
            const applicationStatus = getApplicationStatus(hostel._id);
            return (
              <div key={hostel._id} className="hostel-card" onClick={() => navigate(`/hostels/${hostel._id}`)}>
                {applicationStatus && (
                  <div className={`application-status-badge status-${applicationStatus.toLowerCase()}`}>
                    {applicationStatus === 'Pending' && <><FaClock /> Applied</>}
                    {applicationStatus === 'Accepted' && <><FaCheckCircle /> Accepted</>}
                    {applicationStatus === 'Rejected' && <><FaTimesCircle /> Rejected</>}
                  </div>
                )}
                {hostel.images && hostel.images.length > 0 ? (
                  <img 
                    src={hostel.images[0].url} 
                    alt={hostel.name}
                    className="hostel-image"
                  />
                ) : (
                  <div className="hostel-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                    🏠
                  </div>
                )}
                <div className="hostel-content">
                  <h3>{hostel.name}</h3>
                  <p className="hostel-address">
                    <FaMapMarkerAlt /> {hostel.address}
                  </p>
                  <p className="hostel-description">{hostel.description}</p>
                  <div className="hostel-info">
                    <span className="hostel-price">
                      <FaRupeeSign /> {hostel.price}/month
                    </span>
                    <span className="hostel-capacity">
                      <FaUsers /> {hostel.capacity}
                    </span>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/hostels/${hostel._id}`);
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HostelList;
