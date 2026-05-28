import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Discover a wide range of hostels and make your booking seamless.</p>
          <div className="hero-buttons">
            <Link to="/student/login" className="btn btn-primary">Student Login</Link>
            <Link to="/admin/login" className="btn btn-secondary">Hostel Owner Login</Link>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <h3>Easy Search</h3>
          <p>Quickly find hostels that match your preferences with advanced filters.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Booking</h3>
          <p>Book your room with confidence through our secure payment gateway.</p>
        </div>
        <div className="feature-card">
          <h3>Manage Your Listings</h3>
          <p>Hostel owners can easily add and manage their property listings.</p>
        </div>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>We provide a platform to connect students and hostel owners, making the process of finding and booking accommodations simple and efficient.</p>
      </section>

      <footer className="footer-section">
        <p>&copy; 2023 Hostel Booking App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
