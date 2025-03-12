
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

/**
 * Interface for experience data
 */
interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

/**
 * Experience data
 * You can modify this array to add, update, or remove work experiences
 */
const experiences: Experience[] = [
  {
    id: '1',
    position: 'Stagiaire en Gestion des Stocks',
    company: 'Ideal',
    location: 'Casablanca, Maroc',
    period: 'Juillet 2021 - Août 2021',
    description: [
      'Optimisation du système de gestion des stocks et d\'inventaire',
      'Analyse des données pour identifier les tendances et améliorer l\'efficacité',
      'Mise en œuvre de nouvelles procédures de contrôle qualité',
      'Collaboration avec l\'équipe logistique pour rationaliser les processus'
    ]
  }
];

/**
 * Experience component
 * Displays professional experience with details
 */
const Experience = () => {
  // State to control animation visibility
  const [isVisible, setIsVisible] = useState(false);
  // Reference to the section for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Effect to handle the intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className={`py-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-2">Expérience</Badge>
          <h2 className="section-title">Parcours professionnel</h2>
        </div>
        
        {/* Experience cards */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <div 
              key={experience.id}
              className="flex flex-col md:flex-row gap-6 animate-scale-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {/* Icon container */}
              <div className="md:w-1/4 flex justify-center md:justify-end">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              {/* Experience details card */}
              <Card className="glass flex-1 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{experience.position}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center text-muted-foreground mb-4 gap-1 sm:gap-3">
                    <span className="font-medium">{experience.company}</span>
                    <span className="hidden sm:block">•</span>
                    <span>{experience.location}</span>
                    <span className="hidden sm:block">•</span>
                    <span>{experience.period}</span>
                  </div>
                  
                  {/* List of responsibilities/accomplishments */}
                  <ul className="space-y-2 mt-4">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
