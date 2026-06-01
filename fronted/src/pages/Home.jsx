import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaClipboardCheck,
  FaShieldAlt,
  FaSearch,
  FaStar,
  FaChevronRight,
} from 'react-icons/fa';
import './Home.css';

const MARQUEE_ITEMS = [
  'Verified Listings',
  'Instant Applications',
  'Secure Login',
  'Admin Dashboard',
  'Real-time Status',
];

const QUOTES = [
  {
    text: 'Found my hostel in one afternoon. The application flow is straightforward.',
    author: 'gilman shaikh, Engineering Student',
  },
  {
    text: 'As a hostel owner, managing applications from one dashboard saved us hours every week.',
    author: 'pratik bhopi, Hostel Admin',
  },
  {
    text: 'Clean interface, clear pricing, and I could track my application status easily.',
    author: 'Arjun K., MBA Student',
  },
];

const FEATURES = [
  {
    icon: <FaSearch />,
    title: 'Smart Search',
    description: 'Filter hostels by price, capacity, and location to find the right fit.',
  },
  {
    icon: <FaClipboardCheck />,
    title: 'One-Click Apply',
    description: 'Submit applications online and track Pending, Accepted, or Rejected status.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Trusted Platform',
    description: 'Students and verified hostel admins connect through a secure portal.',
  },
];

const STEPS = [
  { num: 1, title: 'Create Account', description: 'Register as a student or hostel admin.' },
  { num: 2, title: 'Browse or List', description: 'Students explore hostels; admins add listings.' },
  { num: 3, title: 'Apply or Review', description: 'Students apply; admins review applications.' },
  { num: 4, title: 'Get Confirmed', description: 'Track decisions and move in with confidence.' },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="grid-background" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid-line" />
        ))}
      </div>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Student Hostel</h1>
          <p className="hero-subtitle">
            HostelHub connects students with quality accommodations and gives hostel owners
            simple tools to manage listings and applications.
          </p>
          <div className="hero-buttons">
            <button type="button" className="btn-primary" onClick={() => navigate('/hostels')}>
              Browse Hostels
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/auth-select')}>
              Get Started
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <FaHome className="stat-icon" />
              <div>
                <h3>100+</h3>
                <p>Listed Hostels</p>
              </div>
            </div>
            <div className="stat-item">
              <FaClipboardCheck className="stat-icon" />
              <div>
                <h3>Fast</h3>
                <p>Online Applications</p>
              </div>
            </div>
            <div className="stat-item">
              <FaStar className="stat-icon" />
              <div>
                <h3>4.8</h3>
                <p>Student Rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-card">
              <span className="hero-visual-badge">New listing</span>
              <h3>Sunrise Residency</h3>
              <p>Mumbai · ₹8,500/mo</p>
              <button type="button" className="hero-visual-cta">
                View details <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-section" aria-label="Highlights">
        <div className="marquee-content">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={`${item}-${i}`} className="marquee-item">
                <FaStar className="marquee-icon" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="quotes-section">
        <h2>What Students Say</h2>
        <div className="quotes-grid">
          {QUOTES.map((quote) => (
            <article key={quote.author} className="quote-card">
              <p className="quote-text">{quote.text}</p>
              <p className="quote-author">— {quote.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2>Why HostelHub?</h2>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {STEPS.map((step) => (
            <article key={step.num} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to find your next home?</h2>
          <p>Join as a student or list your hostel as an admin today.</p>
          <div className="cta-buttons">
            <button type="button" className="btn-primary" onClick={() => navigate('/student/register')}>
              Student Sign Up
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/admin/register')}>
              Admin Sign Up
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
