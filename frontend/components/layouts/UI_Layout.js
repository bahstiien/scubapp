import React from 'react';
import Footer from '../ui/Footer';
import Navbar from '../ui/Navbar';

const UI_Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default UI_Layout;
