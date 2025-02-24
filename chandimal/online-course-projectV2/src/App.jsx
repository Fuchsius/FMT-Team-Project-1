import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TopFeatures from "./components/TopFeatures/TopFeatures";
import AboutUs from "./components/AboutUs/AboutUs";

const App = () => { 
  return (
    <div>
     <Navbar />
     <Hero />
    <TopFeatures />
    <AboutUs />
    </div>
  );
}

export default App;