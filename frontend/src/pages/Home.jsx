import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Hotels from "../components/hotels";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Hero />
      
      <Hotels />
      <About />
      <ContactUs />
      <Footer />
    </>
  );
}

export default Home;
