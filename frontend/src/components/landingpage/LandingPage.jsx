import React from "react";
import { Navbar, Home, About, Feature, Contact, Footer } from "./index";

function LandingPage() {
  return (
    <div className="font-Poppins bg-Solitude">
      <Navbar />
      <Home />
      <About />
      <Feature />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
