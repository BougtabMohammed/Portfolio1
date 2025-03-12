
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Code, Eye, Github } from 'lucide-react';

/**
 * Interface for project data
 */
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink?: string;
  codeLink?: string;
  category: string;
}

/**
 * Projects data
 * You can modify this array to add, update, or remove projects
 */
const projects: Project[] = [
  {
    id: '1',
    title: 'Gestion des notes en C++',
    description: 'Application de bureau pour la gestion des notes des étudiants. Implémentation avancée utilisant la STL et les principes de la programmation orientée objet.',
    technologies: ['C++', 'POO', 'STL', 'Fichiers'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    codeLink: 'https://github.com',
    category: 'desktop'
  },
  {
    id: '2',
    title: 'Développement web Python',
    description: 'Projet web complet développé avec Django, incluant authentification, gestion de données et interface utilisateur responsive.',
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    demoLink: 'https://demo.example.com',
    codeLink: 'https://github.com',
    category: 'web'
  }
];

/**
 * Projects component
 * Displays projects in a grid layout
 */
const Projects = () => {
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
      id="projects" 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-background to-secondary/30 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-2">Réalisations</Badge>
          <h2 className="section-title">Projets</h2>
        </div>
        
        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="glass overflow-hidden card-hover animate-scale-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {/* Project image */}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              {/* Project details */}
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                {/* Technology badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              {/* Project links */}
              <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                {project.demoLink && (
                  <Button variant="outline" asChild>
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Démo
                    </a>
                  </Button>
                )}
                
                {project.codeLink && (
                  <Button variant="outline" asChild>
                    <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
