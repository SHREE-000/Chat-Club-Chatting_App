import React from 'react'
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import Service from './Service';
import Footer from './Footer';
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <>
    <NavBar />
    <AboutPage />
    <Service />
    <ContactPage />
    <Footer />
    </>
  )
}

export default HomePage;