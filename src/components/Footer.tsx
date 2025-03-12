
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold">MB</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <p>
              © {currentYear} Mohammed Bougtab. Tous droits réservés.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center text-sm">
            <span className="flex items-center gap-1">
              Conçu avec <Heart className="h-3 w-3 text-red-500 fill-red-500" /> au Maroc
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
