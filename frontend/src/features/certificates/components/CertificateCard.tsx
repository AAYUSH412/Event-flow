import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BackgroundGradient } from '@/components/ui/animated-elements';

// Define Certificate interface
interface Certificate {
  _id: string;
  pdfUrl: string;
  issuedDate: string;
  event?: {
    title: string;
    description?: string;
  };
}

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(certificate.issuedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <BackgroundGradient className="h-full">
        <Card className="h-full bg-white/95 backdrop-blur-sm border-none overflow-hidden flex flex-col">
          <div className="relative">
            {/* Certificate Icon with Animation */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-indigo-100/80 to-transparent
              flex items-center justify-center transition-all duration-300
              ${isHovered ? 'opacity-10' : 'opacity-30'}
            `}>
              <Award className="w-32 h-32 text-indigo-200" strokeWidth={0.5} />
            </div>
            
            <div className="pt-8 px-6 relative z-10">
              <motion.div 
                animate={{ rotate: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Award className="w-12 h-12 mx-auto text-indigo-600" />
              </motion.div>
              <h2 className="text-xl font-bold text-center mt-4 text-gray-800">
                {certificate.event?.title || "Achievement Certificate"}
              </h2>
              <div className="flex items-center justify-center mt-2 text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{formattedDate}</span>
              </div>
            </div>
          </div>
          
          <CardContent className="flex-grow flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full"
            >
              <div className="py-3 px-4 bg-indigo-50 rounded-lg text-center">
                <p className="text-sm text-indigo-700 font-medium">
                  Certificate of Completion
                </p>
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="border-t border-gray-100 bg-gray-50/50 p-4 gap-2 flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => window.open(certificate.pdfUrl, "_blank")}
              className="flex-1 text-indigo-700"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              asChild
            >
              <a href={certificate.pdfUrl} download>
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </Button>
          </CardFooter>
        </Card>
      </BackgroundGradient>
    </motion.div>
  );
};
