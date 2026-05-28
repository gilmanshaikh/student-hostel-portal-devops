import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUsers,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from 'react-icons/fa';

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
    try {
      const hostelsData = await getAllHostels();

      setHostels(hostelsData);
      setFilteredHostels(hostelsData);

      if (user && user.role === 'student') {
        const appsData = await getStudentApplications();
        setApplications(appsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getApplicationStatus = (hostelId) => {
    if (!user || user.role !== 'student') return null;

    const application = applications.find(
      (app) => app.hostelId._id === hostelId
    );

    return application ? application.status : null;
  };

  const applyFilters = () => {
    let result = [...hostels];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (hostel) =>
          hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hostel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hostel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Min price
    if (filters.minPrice) {
      result = result.filter(
        (hostel) => hostel.price >= Number(filters.minPrice)
      );
    }

    // Max price
    if (filters.maxPrice) {
      result = result.filter(
        (hostel) => hostel.price <= Number(filters.maxPrice)
      );
    }

    // Sorting
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

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#00ffff',
          background: '#0f172a'
        }}
      >
        🚀 Loading Hostel Portal...
      </div>
    );
  }

  return (
    <div
      className="hostel-list-container"
      style={{
        background: '#0f172a',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      {/* BIG DEVOPS BANNER */}
      <div
        style={{
          background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
          padding: '25px',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '30px',
          boxShadow: '0 0 25px rgba(255,75,43,0.6)'
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '42px',
            margin: 0
          }}
        >
          🚀 DEVOPS CI/CD PIPELINE ACTIVE 🚀
        </h1>

        <p
          style={{
            color: '#fff',
            marginTop: '10px',
            fontSize: '18px'
          }}
        >
          Latest Deployment Successfully Running
        </p>

        <p
          style={{
            color: '#ffe082',
            fontWeight: 'bold'
          }}
        >
          Build Time: {new Date().toLocaleString()}
        </p>
      </div>

      <div className="hostel-list-header">
        <h2
          style={{
            color: '#00ffff',
            fontSize: '38px',
            textAlign: 'center',
            marginBottom: '25px'
          }}
        >
          🏠 Available Hostels
        </h2>

        {/* SEARCH + FILTER */}
        <div
          className="search-filter-section"
          style={{
            background: '#1e293b',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '25px'
          }}
        >
          <form onSubmit={handleSearch} className="search-bar">
            <div
              className="search-input-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#334155',
                padding: '12px',
                borderRadius: '10px'
              }}
            >
              <FaSearch
                className="search-icon"
                style={{ color: '#00ffff', marginRight: '10px' }}
              />

              <input
                type="text"
                placeholder="Search by hostel name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  outline: 'none',
                  fontSize: '16px'
                }}
              />
            </div>

            <button
              type="submit"
              className="search-button"
              style={{
                marginTop: '15px',
                padding: '12px 24px',
                background: '#00ffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </form>

          {/* FILTERS */}
          <div
            className="filter-row"
            style={{
              display: 'flex',
              gap: '15px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}
          >
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPrice: e.target.value
                })
              }
              style={{
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: '#334155',
                color: 'white'
              }}
            />

            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: e.target.value
                })
              }
              style={{
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: '#334155',
                color: 'white'
              }}
            />

            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sortBy: e.target.value
                })
              }
              style={{
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: '#334155',
                color: 'white'
              }}
            >
              <option value="">Default</option>
              <option value="price-low">Price Low → High</option>
              <option value="price-high">Price High → Low</option>
              <option value="capacity-high">Capacity High → Low</option>
              <option value="capacity-low">Capacity Low → High</option>
            </select>

            <button
              onClick={clearFilters}
              style={{
                padding: '12px 20px',
                background: '#ff4b2b',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div
          className="results-count"
          style={{
            color: '#cbd5e1',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '18px'
          }}
        >
          Showing {filteredHostels.length} of {hostels.length} hostels
        </div>
      </div>

      {/* HOSTEL GRID */}
      <div
        className="hostel-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '25px'
        }}
      >
        {filteredHostels.length === 0 ? (
          <div
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: '24px'
            }}
          >
            ❌ No Hostels Found
          </div>
        ) : (
          filteredHostels.map((hostel) => {
            const applicationStatus = getApplicationStatus(hostel._id);

            return (
              <div
                key={hostel._id}
                className="hostel-card"
                onClick={() => navigate(`/hostels/${hostel._id}`)}
                style={{
                  background: '#1e293b',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '2px solid #00ffff',
                  boxShadow: '0 0 20px rgba(0,255,255,0.3)',
                  transition: '0.3s'
                }}
              >
                {/* APPLICATION STATUS */}
                {applicationStatus && (
                  <div
                    style={{
                      padding: '10px',
                      background:
                        applicationStatus === 'Accepted'
                          ? 'green'
                          : applicationStatus === 'Rejected'
                          ? 'red'
                          : 'orange',
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
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

                {/* IMAGE */}
                {hostel.images && hostel.images.length > 0 ? (
                  <img
                    src={hostel.images[0].url}
                    alt={hostel.name}
                    className="hostel-image"
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '220px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '70px',
                      background: '#334155'
                    }}
                  >
                    🏠
                  </div>
                )}

                {/* CONTENT */}
                <div
                  className="hostel-content"
                  style={{
                    padding: '20px',
                    color: 'white'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '24px',
                      marginBottom: '10px'
                    }}
                  >
                    {hostel.name}
                  </h3>

                  <p style={{ color: '#cbd5e1' }}>
                    <FaMapMarkerAlt /> {hostel.address}
                  </p>

                  <p
                    style={{
                      marginTop: '12px',
                      color: '#94a3b8'
                    }}
                  >
                    {hostel.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '18px',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    <span style={{ color: '#4ade80' }}>
                      <FaRupeeSign /> {hostel.price}/month
                    </span>

                    <span style={{ color: '#60a5fa' }}>
                      <FaUsers /> {hostel.capacity}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hostels/${hostel._id}`);
                    }}
                    style={{
                      width: '100%',
                      marginTop: '20px',
                      padding: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      background:
                        'linear-gradient(90deg, #00c6ff, #0072ff)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
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
