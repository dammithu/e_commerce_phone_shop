import React from 'react';
import './services.css'; 

function Services() {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Explore the variety of services we offer to enhance your shopping experience.</p>
      </div>
      <div className="services-info">
        <div className="service-item">
          <i className="fas fa-truck"></i>
          <h2>Fast Delivery</h2>
          <p>Enjoy swift and reliable delivery of your products right to your doorstep.</p>
          <div className="service-details">
            <h3>Delivery Time</h3>
            <p>Typically within 2-4 business days, depending on your location.</p>
            <h3>Shipping Charges</h3>
            <p>Free shipping on orders over $50. Standard rates apply otherwise.</p>
          </div>
        </div>
        <div className="service-item">
          <i className="fas fa-headphones-alt"></i>
          <h2>24/7 Support</h2>
          <p>Our dedicated support team is available around the clock to assist you with any queries.</p>
          <div className="service-details">
            <h3>Support Channels</h3>
            <p>Available via phone, email, and live chat.</p>
            <h3>Response Time</h3>
            <p>Most inquiries are answered within 24 hours.</p>
          </div>
        </div>
        <div className="service-item">
          <i className="fas fa-sync-alt"></i>
          <h2>Easy Returns</h2>
          <p>Experience hassle-free returns and exchanges to ensure complete satisfaction with your purchase.</p>
          <div className="service-details">
            <h3>Return Policy</h3>
            <p>Returns accepted within 30 days of purchase. Items must be unused and in original packaging.</p>
            <h3>Process</h3>
            <p>Contact our support team to initiate a return. We’ll guide you through the process.</p>
          </div>
        </div>
        <div className="service-item">
          <i className="fas fa-gift"></i>
          <h2>Exclusive Offers</h2>
          <p>Benefit from exclusive offers and discounts available only to our valued customers.</p>
          <div className="service-details">
            <h3>Special Discounts</h3>
            <p>Subscribe to our newsletter for updates on the latest deals and promotions.</p>
            <h3>Loyalty Program</h3>
            <p>Join our loyalty program to earn rewards and redeem points on future purchases.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
