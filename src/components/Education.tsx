
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap } from 'lucide-react';

/**
 * Interface for education data
 */
interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

/**
 * Education data
 * You can modify this array to add, update, or remove education entries
 */
const educationData: Education[] = [
  {
    id: '1',
    degree: "Diplôme d'ingénieur",
    institution: "École Marocaine des Sciences de l'Ingénieur (EMSI)",
    period: "2023 - 2026",
    description: "Cycle ingénieur en informatique et réseaux, spécialisation en développement logiciel et bases de données."
  },
  {
    id: '2',
    degree: "Classes préparatoires",
    institution: "École Marocaine des Sciences de l'Ingénieur (EMSI)",
    period: "2021 - 2023",
    description: "Fondamentaux en mathématiques, physique et informatique. Introduction aux technologies de l'information et à la programmation."
  }
];

/**
 * Education component
 * Displays education timeline with alternating cards
 */
const Education = () => {
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
      id="education" 
      ref={sectionRef}
      className={`py-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-2">Parcours académique</Badge>
          <h2 className="section-title">Formation</h2>
        </div>
        
        {/* Timeline layout for education */}
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 md:pl-0">
            {/* Vertical timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
            
            {/* Education items */}
            {educationData.map((item, index) => (
              <div key={item.id} className="mb-12 last:mb-0">
                <div className="relative flex flex-col md:flex-row">
                  {/* Timeline point */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-scale-up" style={{ animationDelay: `${0.2 * index}s` }}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Left side - Degree and period */}
                  <div className="md:w-1/2 md:pr-12 md:text-right md:mb-0 mb-6 animate-fade-in" style={{ animationDelay: `${0.3 * index}s` }}>
                    <Card className="glass overflow-hidden md:ml-auto md:mr-4">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{item.degree}</h3>
                        <p className="text-muted-foreground">{item.period}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Right side - Institution and description */}
                  <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{ animationDelay: `${0.4 * index}s` }}>
                    <Card className="glass overflow-hidden md:ml-4">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-lg">{item.institution}</h4>
                        <Separator className="my-3" />
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
