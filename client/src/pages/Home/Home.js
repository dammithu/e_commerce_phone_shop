import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="homepage">
  
      <div className="overlay"></div>
      <div className="container content-section">
        <div className="row align-items-center justify-content-between">
         
          <div className="col-md-6 shop-info animate__animated animate__fadeInLeft">
            <h1 className="shop-title">Welcome to PrimeMobiles</h1>
            <p className="shop-description">Explore the latest smartphones and accessories with unbeatable deals. Fast delivery and premium customer service guaranteed.</p>
            <a href="/productlist" className="btn btn-primary product-btn animate__animated animate__bounceIn">Shop Now</a>
          </div>

          <div className="col-md-5 animate__animated animate__fadeInRight">
            <div className="image-container">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
