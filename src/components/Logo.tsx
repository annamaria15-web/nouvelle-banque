import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightText?: boolean;
  tagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  // Tente de charger un logo personnalisé s'il existe dans le dossier public/ (ex: public/logo.png ou public/logo.svg)
  const [hasCustomImage, setHasCustomImage] = useState(true);

  const heightClass = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  }[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* 
        ========================================================================
        EMPLACEMENT POUR VOTRE PROPRE LOGO DEPUIS VS CODE :
        
        Méthode 1 (recommandée) :
        - Déposez votre fichier image (ex: 'logo.png' ou 'logo.svg') dans le dossier /public
        
        Méthode 2 :
        - Remplacez directement le code ci-dessous par votre composant SVG ou votre balise <img> :
          <img src="/mon-logo.png" alt="Mon Logo" className="h-8 w-auto object-contain" />
        ========================================================================
      */}
      {hasCustomImage && (
        <img
          src="/logo.png"
          alt="Logo"
          className={`${heightClass} w-auto max-w-[180px] object-contain`}
          onError={() => setHasCustomImage(false)}
        />
      )}
    </div>
  );
};
