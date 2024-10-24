import React from 'react';

interface WhatsAppLinkProps {
  number: string;
  children: React.ReactNode;
  className?: string;
}

const WhatsAppLink: React.FC<WhatsAppLinkProps> = ({ number, children, className }) => {
  const formattedNumber = number?.replace(/[^0-9]/g, '');
  
  if (!formattedNumber) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${formattedNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

export default WhatsAppLink;