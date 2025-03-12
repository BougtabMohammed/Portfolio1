
import { useState, useEffect, useRef, FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Votre message a été envoyé. Merci !");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-secondary/30 to-background transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-2">Contact</Badge>
          <h2 className="section-title">Restons en contact</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Card className="glass animate-scale-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:contact@mohamedbougtab.com" className="hover:text-primary transition-colors">
                          contact@mohamedbougtab.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Téléphone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+212600000000" className="hover:text-primary transition-colors">
                          +212 6 00 00 00 00
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adresse</h3>
                      <p className="text-muted-foreground">
                        Casablanca, Maroc
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Suivez-moi</h3>
                  <div className="flex gap-3">
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-secondary/80 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-secondary/80 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-secondary/80 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="w-full h-64 rounded-xl overflow-hidden animate-scale-up" style={{ animationDelay: '0.2s' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72692390046!2d-7.658354938866105!3d33.57282507070915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1687901460173!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-3 animate-scale-up" style={{ animationDelay: '0.3s' }}>
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Envoyez-moi un message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom complet
                      </label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Votre nom" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Sujet
                    </label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="Sujet du message" 
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Votre message..." 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Envoi en cours...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
