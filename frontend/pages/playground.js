import React from 'react';
import Image from 'next/image';
import hero from '../public/hero.png';
import Footer from '../components/ui/Footer';
import styleHP from '../styles/homepage.module.css';
import Navbar from '../components/ui/Navbar';
import BlogSection from '../components/homepage/BlogSection';
import Actions from '../components/homepage/Actions';
import Test from '../components/Test';

const playground = () => {
  return (
    <>
      {/* <Navbar />
      <Actions />
      <BlogSection />
      <Footer /> */}

      <Test />
    </>
  );
};

export default playground;
