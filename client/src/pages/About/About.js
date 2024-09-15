import React from 'react';
import './about.css'; 

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our mission, values, and the team behind our services.</p>
      </div>
      <div className="about-info">
        <div className="about-item">
          <i className="fas fa-briefcase"></i>
          <h2>Our Mission</h2>
          <p>To provide exceptional phone services and products with a commitment to quality and customer satisfaction.</p>
        </div>
        <div className="about-item">
          <i className="fas fa-handshake"></i>
          <h2>Our Values</h2>
          <p>Integrity, innovation, and customer-centricity are at the core of everything we do.</p>
        </div>
        <div className="about-item">
          <i className="fas fa-users"></i>
          <h2>Our Team</h2>
          <p>A team of experienced professionals dedicated to delivering the best products and support.</p>
        </div>
      </div>
      <div className="about-details">
        <h2>About Our Shop</h2>
        <p>
          Welcome to our shop! Our goal is to exceed your expectations by offering top-notch phone services and products. Our 
          team consists of highly skilled individuals who are passionate about technology and dedicated to providing outstanding 
          customer service. We continuously strive to innovate and improve, ensuring that you have access to the latest and greatest 
          in phone technology. Thank you for choosing us as your go-to provider for all your phone needs.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
