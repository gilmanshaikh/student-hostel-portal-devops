import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCheckCircle, FaShieldAlt, FaHeadset, FaHome, FaUsers, FaMapMarkerAlt, FaStar, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const partners = [
    'IIT Mumbai', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'SRM University',
    'Manipal Institute', 'IIIT Hyderabad', 'DTU Delhi', 'Anna University', 'Pune University'
  ];

  return (
    <div className="home-container">
      {/* Animated Grid Background */}
      <div className="grid-background">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Student Accommodation</h1>
          <p className="hero-subtitle">
            Discover comfortable, affordable hostels near your campus. Your home away from home starts here.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/hostels')}>
              Browse Hostels
            </button>
            <button className="btn-secondary" onClick={() => navigate('/auth-select')}>
              Get Started
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <FaHome className="stat-icon" />
              <div>
                <h3>500+</h3>
                <p>Verified Hostels</p>
              </div>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div>
                <h3>10,000+</h3>
                <p>Happy Students</p>
              </div>
            </div>
            <div className="stat-item">
              <FaMapMarkerAlt className="stat-icon" />
              <div>
                <h3>50+</h3>
                <p>Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWwsrErzc6fPjb9DdzgHzPAQ8v4AlzX0EARg&s" 
            alt="Hostel accommodation"
            className="hero-img"
          />
        </div>
      </div>

      {/* Animated Marquee */}
      <div className="marquee-section">
        <div className="marquee-content">
          <div className="marquee-track">
            {partners.map((partner, index) => (
              <span key={index} className="marquee-item">
                <FaStar className="marquee-icon" />
                {partner}
              </span>
            ))}
            {partners.map((partner, index) => (
              <span key={`duplicate-${index}`} className="marquee-item">
                <FaStar className="marquee-icon" />
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="quotes-section">
        <h2>What Students Say</h2>
        <div className="quotes-grid">
          <div className="quote-card">
            <p className="quote-text">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."</p>
            <p className="quote-author">- KingShivamX</p>
          </div>
          <div className="quote-card">
            <p className="quote-text">"The beautiful thing about learning is that no one can take it away from you."</p>
            <p className="quote-author">- Engg. Jidnyesh Suryawanshi</p>
          </div>
          <div className="quote-card">
            <p className="quote-text">"Success is not final, failure is not fatal: it is the courage to continue that counts."</p>
            <p className="quote-author">- Pralhad Navgire</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose HostelHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Easy Search</h3>
            <p>Find hostels that match your preferences and budget with advanced filters</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCheckCircle />
            </div>
            <h3>Quick Apply</h3>
            <p>Simple application process with instant status updates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Verified Hostels</h3>
            <p>All hostels are verified and managed by trusted admins</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaHeadset />
            </div>
            <h3>24/7 Support</h3>
            <p>Get help whenever you need it from our support team</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Best Prices</h3>
            <p>Compare prices and find the most affordable options</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaClock />
            </div>
            <h3>Instant Booking</h3>
            <p>Book your room instantly with real-time availability</p>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Search & Filter</h3>
            <p>Browse through hundreds of verified hostels and filter by location, price, and amenities</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>View Details</h3>
            <p>Check out detailed information, photos, and reviews of each hostel</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Apply Online</h3>
            <p>Submit your application with just a few clicks - no paperwork needed</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Get Confirmed</h3>
            <p>Receive instant confirmation and move into your new home</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Hostel?</h2>
          <p>Join thousands of students who have found their ideal accommodation through HostelHub</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => navigate('/student/register')}>
              Register as Student
            </button>
            <button className="btn-secondary" onClick={() => navigate('/admin/register')}>
              List Your Hostel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
