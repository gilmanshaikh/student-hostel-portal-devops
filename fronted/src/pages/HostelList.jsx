import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUsers,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from 'react-icons/fa';
import { getAllHostels, getStudentApplications } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './HostelList.css';

const HostelList = () => {
  const [hostels, setHostels] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sortBy: '',
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true); // Fixed: changed from loading(true)
      const hostelsData = await getAllHostels();
      setHostels(Array.isArray(hostelsData) ? hostelsData : []);

      if (user?.role === 'student') {
        const appsData = await getStudentApplications();
        setApplications(Array.isArray(appsData) ? appsData : []);
      }
    } catch (error) {
      console.error('Error fetching data inside component:', error);
      setHostels([]);
    } finally {
      setLoading(false); // Fixed: changed from loading(false)
    }
  };

  // Filter and sorting configurations aligned with MongoDB Schema
  const filteredHostels = useMemo(() => {
    let result = [...hostels];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (hostel) =>
          hostel.name?.toLowerCase().includes(term) ||
          hostel.location?.toLowerCase().includes(term) || 
          hostel.type?.toLowerCase().includes(term)
      );
    }

    if (filters.minPrice) {
      result = result.filter((hostel) => hostel.rentPerMonth >= Number(filters.minPrice)); 
    }

    if (filters.maxPrice) {
      result = result.filter((hostel) => hostel.rentPerMonth <= Number(filters.maxPrice)); 
    }

    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.rentPerMonth - b.rentPerMonth); 
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.rentPerMonth - a.rentPerMonth); 
    } else if (filters.sortBy === 'capacity-high') {
      result.sort((a, b) => b.availableRooms - a.availableRooms); 
    } else if (filters.sortBy === 'capacity-low') {
      result.sort((a, b) => a.availableRooms - b.availableRooms); 
    }

    return result;
  }, [hostels, searchTerm, filters]);

  const getApplicationStatus = (hostelId) => {
    if (!user || user.role !== 'student') return null;
    const application = applications.find((app) => app.hostelId?._id === hostelId);
    return application ? application.status : null;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ minPrice: '', maxPrice: '', sortBy: '' });
  };

  if (loading) {
    return <div className="loading">Loading hostels...</div>;
  }

  return (
    <div className="hostel-list-container">
      <header className="hostel-list-header">
        <h2>Available Hostels</h2>
        <p className="hostel-list-subtitle">
          Compare options, filter by budget, and apply in a few clicks.
        </p>

        <div className="search-filter-section">
          <form
            className="search-bar"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          <div className="filter-row">
            <input
              type="number"
              className="filter-input"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input
              type="number"
              className="filter-input"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
            <select
              className="filter-select"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="capacity-high">Available Rooms: high to low</option>
              <option value="capacity-low">Available Rooms: low to high</option>
            </select>
            <button type="button" className="clear-filters" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        </div>

        <p className="results-count">
          Showing {filteredHostels.length} of {hostels.length} hostels
        </p>
      </header>

      {filteredHostels.length === 0 ? (
        <div className="empty-state">No hostels match your search. Try adjusting filters.</div>
      ) : (
        <div className="hostel-grid">
          {filteredHostels.map((hostel) => {
            const applicationStatus = getApplicationStatus(hostel._id);
            const statusClass =
              applicationStatus === 'Accepted'
                ? 'status-accepted'
                : applicationStatus === 'Rejected'
                  ? 'status-rejected'
                  : 'status-pending';

            return (
              <article
                key={hostel._id}
                className="hostel-card"
                onClick={() => navigate(`/hostels/${hostel._id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/hostels/${hostel._id}`);
                }}
                role="button"
                tabIndex={0}
              >
                {applicationStatus && (
                  <div className={`application-status-badge ${statusClass}`}>
                    {applicationStatus === 'Pending' && (
                      <>
                        <FaClock /> Applied
                      </>
                    )}
                    {applicationStatus === 'Accepted' && (
                      <>
                        <FaCheckCircle /> Accepted
                      </>
                    )}
                    {applicationStatus === 'Rejected' && (
                      <>
                        <FaTimesCircle /> Rejected
                      </>
                    )}
                  </div>
                )}

                {hostel.images && hostel.images.length > 0 && hostel.images[0].url ? (
                  <img src={hostel.images[0].url} alt={hostel.name} className="hostel-image" />
                ) : (
                  <div className="hostel-image hostel-image-placeholder">🏠</div>
                )}

                <div className="hostel-content">
                  <div className="hostel-card-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{hostel.name}</h3>
                    <span className={`type-badge ${hostel.type?.toLowerCase()}`} style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: '#e0e0e0' }}>
                      {hostel.type}
                    </span>
                  </div>
                  
                  <p className="hostel-address">
                    <FaMapMarkerAlt /> {hostel.location}
                  </p>
                  
                  <div className="hostel-info">
                    <span className="hostel-price">
                      <FaRupeeSign /> {hostel.rentPerMonth}/mo
                    </span>
                    <span className="hostel-capacity">
                      <FaUsers /> {hostel.availableRooms} / {hostel.totalRooms} left
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hostels/${hostel._id}`);
                    }}
                  >
                    View details
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HostelList;