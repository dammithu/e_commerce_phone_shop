import React from 'react';
import './contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’re here to assist you with any questions or support you need. Get in touch with us!</p>
      </div>
      <div className="contact-info">
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <h2>Email</h2>
          <p>primemobiles@gmail.com</p>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone-alt"></i>
          <h2>Phone</h2>
          <p>+123 456 7890</p>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <h2>Location</h2>
          <p>123 Main Street, Matara</p>
        </div>
      </div>
      <div className="contact-details">
        <h2>About Our Shop</h2>
        <p>
          Welcome to our shop! We offer premium phone services and products with a focus on quality and customer satisfaction. 
          Our experienced team is dedicated to helping you with any product inquiries or technical support you may need. Feel free 
          to visit us or get in touch via email or phone. We’re here to assist you in every possible way.
        </p>
      </div>
    </div>
  );
}

export default Contact;
