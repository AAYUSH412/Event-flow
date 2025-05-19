"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certificateService } from "@/features/common/services";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";
import {
  CertificateCard,
  NoCertificates,
  PageHeader
} from "@/features/certificates/components";

// Define the Certificate type
interface Certificate {
  _id: string;
  userId: string;
  eventId: string;
  registrationId: string;
  pdfUrl: string; // This should match what's used in your components
  certificateUrl?: string;
  issuedDate: string;
  createdAt: string;
  updatedAt: string;
  event?: {
    title: string;
    description?: string;
  };
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const response = await certificateService.getUserCertificates();
        setCertificates(response.certificates);
        setFilteredCertificates(response.certificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCertificates(certificates);
      return;
    }
    
    const filtered = certificates.filter((cert) => 
      cert.event?.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner variant="ellipsis" color="teal" size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto pb-12"
    >
      <PageHeader 
        title="My Certificates" 
        certificateCount={certificates.length}
        onSearch={handleSearch}
      />
      
      {certificates.length === 0 ? (
        <NoCertificates />
      ) : (
        <>
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600">No certificates match your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <CertificateCard certificate={certificate} />
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
