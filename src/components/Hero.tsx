
import { ChevronDown, Download, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

/**
 * Hero section component
 * Contains profile information, photo, and call-to-action buttons
 * This section appears at the top of the page
 */
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pb-16 pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.08),transparent_40%)]"></div>
      
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className={`md:w-1/2 text-center md:text-left space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Ingénieur en Informatique
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down" style={{ animationDelay: '0.2s' }}>
            Mohammed <span className="text-primary">Bougtab</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Étudiant passionné en ingénierie informatique avec une solide expérience en développement informatique et une expertise pratique dans la conception et l'optimisation de bases de données relationnelles.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button asChild className="rounded-full">
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Télécharger CV
              </a>
            </Button>
            
            <Button variant="outline" asChild className="rounded-full">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
        
        <div className={`md:w-1/2 flex justify-center md:justify-end transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative">
            <div className="animate-blur-in" style={{ animationDelay: '0.3s' }}>
              {/* 
                * Pour changer la photo de profil:
                * 1. Remplacez l'URL dans 'src' ci-dessous par l'URL de votre propre photo
                * 2. Ou placez votre photo dans le dossier 'public', puis utilisez "/votre-photo.jpg"
                * 3. Assurez-vous que l'image est de bonne qualité et correctement dimensionnée
                * Note: Préférez une image carrée ou rectangulaire avec un rapport hauteur/largeur proche de 1:1
                */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10">
                <img 
                  src="/lovable-uploads/7f88d71e-94f0-4df5-b202-44b716c5c3bb.png" 
                  alt="Mohammed Bougtab" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 md:w-80 md:h-80 rounded-3xl border-4 border-primary/20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#certifications" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity delay-1000 opacity-0 duration-1000"
        style={{ animationDuration: '2s', opacity: isVisible ? 1 : 0 }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </a>
    </section>
  );
};

export default Hero;
