
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

/**
 * Navbar component
 * Contains navigation links and theme toggle
 * You can modify the navLinks array to change the navigation items
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to handle scroll detection for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Navigation links in the order: Certifications -> Education -> Skills -> Experience -> Projects
  const navLinks = [
    { href: '#home', label: 'Accueil' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#education', label: 'Formation' },
    { href: '#skills', label: 'Compétences' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-subtle' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="text-xl font-bold">
            MB
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 flex flex-col items-end space-y-1.5">
                <span className={`h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 pb-4">
          <div className="flex flex-col space-y-2 py-2">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-foreground py-2 px-4 hover:bg-secondary/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
