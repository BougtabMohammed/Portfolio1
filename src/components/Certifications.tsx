
import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Interface for certification data
 */
interface Certification {
  id: string;
  platform: string;
  title: string;
  date: string;
  skills: string[];
  verificationLink?: string;
  category: string;
  image: string;
}

/**
 * Certification data
 * You can modify this array to add, update, or remove certifications
 */
const certifications: Certification[] = [
  {
    id: '1',
    platform: 'Coursera',
    title: 'Introduction à la programmation orientée objet (en C++)',
    date: 'Janvier 2023',
    skills: ['C++', 'POO', 'Algorithmes'],
    verificationLink: 'https://coursera.org/verify/123456',
    category: 'programmation',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/78/bf51658aa611e7b1b9d56f89123e89/Logo-cours-1.png?auto=format%2Ccompress&dpr=1'
  },
  {
    id: '2',
    platform: 'Coursera',
    title: 'Programming for Everybody (Getting Started with Python)',
    date: 'Mars 2023',
    skills: ['Python', 'Bases de programmation'],
    verificationLink: 'https://coursera.org/verify/234567',
    category: 'programmation',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/08/33f720502a11e59e72391aa537f5c9/pythonlearn_thumbnail_1x1.png?auto=format%2Ccompress&dpr=1'
  },
  {
    id: '3',
    platform: 'Coursera',
    title: 'Software Engineering: Software Design and Project Management',
    date: 'Juin 2023',
    skills: ['Gestion de projet', 'UML', 'Conception logicielle'],
    verificationLink: 'https://coursera.org/verify/345678',
    category: 'méthodologie',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/5a/562e3a0b0611e7a4864d91c91bbe37/Course2_Logo_500x500.png?auto=format%2Ccompress&dpr=1'
  },
  {
    id: '4',
    platform: 'Coursera',
    title: 'The Unix Workbench',
    date: 'Août 2023',
    skills: ['Unix', 'Shell', 'Linux'],
    verificationLink: 'https://coursera.org/verify/456789',
    category: 'systèmes',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/19/ea8e80a3fe11e7a7a29b50a103fd22/unix-workbench-logo-1.png?auto=format%2Ccompress&dpr=1'
  }
];

/**
 * Certifications component
 * Displays certifications in a grid with filtering capabilities
 */
const Certifications = () => {
  // State for the selected filter tab
  const [selectedTab, setSelectedTab] = useState('all');
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

  // Filter categories
  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'programmation', label: 'Programmation' },
    { id: 'méthodologie', label: 'Méthodologie' },
    { id: 'systèmes', label: 'Systèmes' }
  ];

  // Filter certifications based on selected category
  const filteredCertifications = selectedTab === 'all'
    ? certifications
    : certifications.filter(cert => cert.category === selectedTab);

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className={`py-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <Badge className="mb-2">Vérifiées</Badge>
          <h2 className="section-title text-center">Certifications</h2>
        </div>
        
        {/* Filter tabs for certification categories */}
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* Certification grid with cards */}
          <TabsContent value={selectedTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCertifications.map((cert, index) => (
                <div 
                  key={cert.id}
                  className="glass rounded-xl overflow-hidden shadow-lg card-hover animate-scale-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-black font-medium dark:bg-black/60 dark:text-white">
                        {cert.platform}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-2">{cert.date}</p>
                    <h3 className="font-bold text-lg mb-3 line-clamp-2">{cert.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-secondary/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {cert.verificationLink && (
                      <Button variant="ghost" asChild className="w-full flex items-center justify-center gap-2 mt-2">
                        <a 
                          href={cert.verificationLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <span>Vérifier</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Certifications;
