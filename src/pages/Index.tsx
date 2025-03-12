
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

/**
 * Main index page component that contains all sections of the portfolio
 * The order of sections: Certifications -> Education -> Skills -> Experience -> Projects
 */
const Index = () => {
  // State to control the visibility of the scroll-to-top button
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Effect to handle scroll detection for the scroll-to-top button
  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Effect to handle section animations on scroll
  useEffect(() => {
    // Configuration for the intersection observer
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    // Create an observer to detect when elements come into viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with the 'section' class
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Clean up observer when component unmounts
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        {/* Fixed navigation bar */}
        <Navbar />
        
        {/* Hero section with profile picture and intro */}
        <Hero />
        
        {/* Sections ordered as requested: Certifications -> Education -> Skills -> Experience -> Projects */}
        <Certifications /> {/* You can modify certification details in src/components/Certifications.tsx */}
        <Education /> {/* You can modify education details in src/components/Education.tsx */}
        <Skills /> {/* You can modify skills in src/components/Skills.tsx */}
        <Experience /> {/* You can modify experience details in src/components/Experience.tsx */}
        <Projects /> {/* You can modify projects in src/components/Projects.tsx */}
        
        {/* Contact form and footer */}
        <Contact />
        <Footer />
        
        {/* Scroll to top button - appears after scrolling down */}
        <Button
          variant="outline"
          size="icon"
          className={`fixed bottom-6 right-6 z-50 rounded-full shadow-md transition-all duration-300 ${
            showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Index;
