"use client";

import { useRef } from "react";

import { Navbar } from "../components/MainHeader/Navbar";
import { Home } from "../components/Home/Home";
import { Footer } from "../components/Footer/Footer";
import Contact from "../components/Contact/Contact";
import { AboutMe } from "../components/AboutMe/AboutMe";
import { Portfolio } from "../components/Portfolio/Portfolio";

function App() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutMeRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleHomeClick = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAboutMeClick = () => {
    aboutMeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePortfolioClick = () => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        handleHomeClick={handleHomeClick}
        handleAboutMeClick={handleAboutMeClick}
        handlePortfolioClick={handlePortfolioClick}
        handleContactClick={handleContactClick}
      />
      <Home ref={homeRef} />
      <AboutMe ref={aboutMeRef} />
      <Portfolio ref={portfolioRef} />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
}

export default App;
