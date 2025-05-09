import React from 'react';
import Image from 'next/image';

interface LogoTileProps {
  name: string;
  logoPath: string;
  alt: string;
}

const LogoTile: React.FC<LogoTileProps> = ({ name, logoPath, alt }) => {
  return (
    <div className="h-16 flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-gray-900/30 rounded-lg p-4 group">
      <div className="w-full h-10 relative flex items-center justify-center">
        <Image 
          src={logoPath} 
          alt={alt}
          width={100}
          height={40}
          className="object-contain w-auto h-full max-h-10 opacity-70 group-hover:opacity-100 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default LogoTile; 