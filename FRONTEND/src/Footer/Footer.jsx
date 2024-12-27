import React from 'react';
import './Footer.css'; 

export default function Footer (){
  return (
    <footer>
      <div className="footer-content">
        <div className="about-us">
          <h2>About Us</h2>
          <p>
            Welcome to Food Truck Mumbai, your ultimate platform to discover and connect with the best food trucks in Mumbai. Whether you're craving street food or delicious desserts, we bring the city's food trucks to your fingertips. Explore, order, and enjoy!
          </p>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a >Menu</a></li>
            <li><a >About Us</a></li>
            <li><a >Contact Us</a></li>
          </ul>
        </div>
        <p>&copy; 2024 Food Truck Mumbai. All rights reserved.</p>
      </div>
    </footer>
  );
};

