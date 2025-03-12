
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Interface for individual skill
 */
interface Skill {
  name: string;
  level: number;
}

/**
 * Interface for skill category
 */
interface SkillCategory {
  title: string;
  skills: Skill[];
  icon: string;
}

/**
 * Skill categories and data
 * You can modify this array to add, update, or remove skills and categories
 */
const skillCategories: SkillCategory[] = [
  {
    title: 'Langages de programmation',
    icon: '👨‍💻',
    skills: [
      { name: 'C', level: 85 },
      { name: 'C++', level: 90 },
      { name: 'C#', level: 75 },
      { name: 'Python', level: 80 },
    ],
  },
  {
    title: 'Développement web',
    icon: '🌐',
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'PHP', level: 70 },
      { name: 'Django', level: 65 },
      { name: 'Symfony', level: 60 },
    ],
  },
  {
    title: 'Bases de données',
    icon: '🗄️',
    skills: [
      { name: 'SQL', level: 85 },
      { name: 'PL/SQL', level: 80 },
      { name: 'SQL Server', level: 75 },
      { name: 'T-SQL', level: 70 },
    ],
  },
  {
    title: 'Méthodologies',
    icon: '📊',
    skills: [
      { name: 'UML', level: 85 },
      { name: 'OOP', level: 90 },
      { name: 'Merise', level: 80 },
    ],
  },
  {
    title: 'Systèmes',
    icon: '💻',
    skills: [
      { name: 'Linux', level: 75 },
      { name: 'Shell Unix', level: 70 },
    ],
  },
  {
    title: 'Langues',
    icon: '🌍',
    skills: [
      { name: 'Arabe (Natif)', level: 100 },
      { name: 'Français (B2)', level: 80 },
      { name: 'Anglais (B1)', level: 70 },
    ],
  },
];

/**
 * Skills component
 * Displays skill categories with progress bars
 */
const Skills = () => {
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
      id="skills" 
      ref={sectionRef}
      className={`py-20 bg-secondary/30 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-2">Expertise</Badge>
          <h2 className="section-title">Compétences</h2>
        </div>
        
        {/* Grid of skill category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="glass card-hover animate-scale-up" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                {/* Skills with progress bars */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="skill-level">
                        <div 
                          className="skill-progress"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${0.2 + (0.1 * skillIndex)}s` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
