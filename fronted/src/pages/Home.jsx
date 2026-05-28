import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
  FaHome,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
  FaMoneyBillWave,
  FaClock,
  FaRocket
} from 'react-icons/fa';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const partners = [
    'IIT Mumbai',
    'NIT Trichy',
    'BITS Pilani',
    'VIT Vellore',
    'SRM University',
    'Manipal Institute',
    'IIIT Hyderabad',
    'DTU Delhi',
    'Anna University',
    'Pune University'
  ];

  return (
    <>
      {/* DEVOPS BANNER */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          background: 'linear-gradient(90deg, #ff0000, #000000)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          zIndex: '9999',
          boxShadow: '0 0 20px rgba(255,0,0,0.8)'
        }}
      >
        <h1
          style={{
            margin: '0',
            fontSize: '40px',
            fontWeight: 'bold'
          }}
        >
          🚀 DEVOPS PIPELINE SUCCESSFULLY WORKING 🚀
        </h1>

        <p
          style={{
            marginTop: '10px',
            fontSize: '18px',
            color: '#00ffcc'
          }}
        >
          Latest Deployment Time: {new Date().toLocaleString()}
        </p>
      </div>

      <div
        className="home-container"
        style={{
          marginTop: '120px',
          background: '#0f172a',
          color: 'white'
        }}
      >
        {/* Animated Grid Background */}
        <div className="grid-background">
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
        </div>

        {/* HERO SECTION */}
        <div
          className="hero-section"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '80px 60px',
            flexWrap: 'wrap',
            gap: '40px'
          }}
        >
          <div className="hero-content" style={{ flex: '1' }}>
            <div
              style={{
                background: '#ff0000',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                borderRadius: '30px',
                marginBottom: '25px',
                fontWeight: 'bold'
              }}
            >
              <FaRocket />
              LIVE CI/CD BUILD ACTIVE
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: '65px',
                lineHeight: '1.2',
                marginBottom: '25px',
                color: '#ffffff'
              }}
            >
              Find Your Perfect Student Accommodation
            </h1>

            <p
              className="hero-subtitle"
              style={{
                fontSize: '22px',
                color: '#cbd5e1',
                maxWidth: '700px'
              }}
            >
              Discover comfortable, affordable hostels near your campus.
              Your home away from home starts here.
            </p>

            <div
              className="hero-buttons"
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '35px',
                flexWrap: 'wrap'
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate('/hostels')}
                style={{
                  background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 35px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Browse Hostels
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate('/auth-select')}
                style={{
                  background: 'transparent',
                  border: '2px solid #00c6ff',
                  color: '#00c6ff',
                  padding: '15px 35px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Get Started
              </button>
            </div>

            {/* STATS */}
            <div
              className="hero-stats"
              style={{
                display: 'flex',
                gap: '25px',
                marginTop: '50px',
                flexWrap: 'wrap'
              }}
            >
              <div
                className="stat-item"
                style={{
                  background: '#1e293b',
                  padding: '20px',
                  borderRadius: '18px',
                  minWidth: '220px',
                  border: '2px solid #00c6ff'
                }}
              >
                <FaHome
                  className="stat-icon"
                  style={{
                    fontSize: '35px',
                    color: '#00c6ff'
                  }}
                />

                <h3 style={{ fontSize: '32px', marginTop: '10px' }}>
                  500+
                </h3>

                <p style={{ color: '#cbd5e1' }}>Verified Hostels</p>
              </div>

              <div
                className="stat-item"
                style={{
                  background: '#1e293b',
                  padding: '20px',
                  borderRadius: '18px',
                  minWidth: '220px',
                  border: '2px solid #22c55e'
                }}
              >
                <FaUsers
                  className="stat-icon"
                  style={{
                    fontSize: '35px',
                    color: '#22c55e'
                  }}
                />

                <h3 style={{ fontSize: '32px', marginTop: '10px' }}>
                  10,000+
                </h3>

                <p style={{ color: '#cbd5e1' }}>Happy Students</p>
              </div>

              <div
                className="stat-item"
                style={{
                  background: '#1e293b',
                  padding: '20px',
                  borderRadius: '18px',
                  minWidth: '220px',
                  border: '2px solid #f59e0b'
                }}
              >
                <FaMapMarkerAlt
                  className="stat-icon"
                  style={{
                    fontSize: '35px',
                    color: '#f59e0b'
                  }}
                />

                <h3 style={{ fontSize: '32px', marginTop: '10px' }}>
                  50+
                </h3>

                <p style={{ color: '#cbd5e1' }}>Cities Covered</p>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div
            className="hero-image"
            style={{
              flex: '1',
              textAlign: 'center'
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWwsrErzc6fPjb9DdzgHzPAQ8v4AlzX0EARg&s"
              alt="Hostel accommodation"
              className="hero-img"
              style={{
                width: '100%',
                maxWidth: '600px',
                borderRadius: '25px',
                boxShadow: '0 0 40px rgba(0,198,255,0.5)'
              }}
            />
          </div>
        </div>

        {/* MARQUEE */}
        <div
          className="marquee-section"
          style={{
            padding: '25px',
            background: '#111827',
            overflow: 'hidden'
          }}
        >
          <div className="marquee-content">
            <div
              className="marquee-track"
              style={{
                display: 'flex',
                gap: '40px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {partners.map((partner, index) => (
                <span
                  key={index}
                  className="marquee-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '20px',
                    color: '#00ffcc',
                    fontWeight: 'bold'
                  }}
                >
                  <FaStar />
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div
          className="features-section"
          style={{
            padding: '80px 40px'
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '50px',
              marginBottom: '50px'
            }}
          >
            Why Choose HostelHub?
          </h2>

          <div
            className="features-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}
          >
            {[
              {
                icon: <FaSearch />,
                title: 'Easy Search',
                desc: 'Find hostels that match your preferences and budget'
              },
              {
                icon: <FaCheckCircle />,
                title: 'Quick Apply',
                desc: 'Simple application process with instant updates'
              },
              {
                icon: <FaShieldAlt />,
                title: 'Verified Hostels',
                desc: 'All hostels are verified and trusted'
              },
              {
                icon: <FaHeadset />,
                title: '24/7 Support',
                desc: 'Get help whenever you need it'
              },
              {
                icon: <FaMoneyBillWave />,
                title: 'Best Prices',
                desc: 'Compare prices and save money'
              },
              {
                icon: <FaClock />,
                title: 'Instant Booking',
                desc: 'Book rooms with real-time availability'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{
                  background: '#1e293b',
                  padding: '35px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid #334155',
                  transition: '0.3s'
                }}
              >
                <div
                  style={{
                    fontSize: '50px',
                    color: '#00c6ff',
                    marginBottom: '20px'
                  }}
                >
                  {feature.icon}
                </div>

                <h3 style={{ fontSize: '28px' }}>{feature.title}</h3>

                <p
                  style={{
                    marginTop: '15px',
                    color: '#cbd5e1',
                    fontSize: '18px'
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="cta-section"
          style={{
            background: 'linear-gradient(90deg, #0f172a, #1e293b)',
            padding: '80px 40px',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              fontSize: '55px',
              marginBottom: '20px'
            }}
          >
            Ready to Find Your Perfect Hostel?
          </h2>

          <p
            style={{
              fontSize: '22px',
              color: '#cbd5e1',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            Join thousands of students who found their ideal accommodation.
          </p>

          <div
            className="cta-buttons"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '25px',
              marginTop: '40px',
              flexWrap: 'wrap'
            }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate('/student/register')}
              style={{
                background: '#00c6ff',
                color: 'white',
                border: 'none',
                padding: '18px 40px',
                borderRadius: '14px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Register as Student
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate('/admin/register')}
              style={{
                background: 'transparent',
                border: '2px solid #00c6ff',
                color: '#00c6ff',
                padding: '18px 40px',
                borderRadius: '14px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              List Your Hostel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
