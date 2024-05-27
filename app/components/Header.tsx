import Link from 'next/link';
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
  
interface AvatarDemoProps {
  src: string;
  fallbackText: string;
}

const AvatarDemo: React.FC<AvatarDemoProps> = ({ src, fallbackText }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={fallbackText} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};

const CircleIcon: React.FC = () => {
  return (
    <div className="w-12 h-12 bg-logo flex items-center justify-center rounded-full">
      <span className="text-white font-light">AI</span>
    </div>
  );
};


export default function Header() {
  const avatarSrc = "data:image/png;base64,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";
  const fallbackText = "AI";

  return (
    <header className="flex items-center justify-between p-4 bg-fondo">
      <div className="flex items-center">
        <CircleIcon />
      </div>
      <div className="flex items-center space-x-8 ml-auto">
        <nav className="flex items-center space-x-8">
        <Link href="/home" className="text-white hover:underline">Home </Link>
        <Link href="/inbox" className="text-white hover:underline">Inbox </Link>
        </nav>
        <AvatarDemo 
          src={avatarSrc} 
          fallbackText={fallbackText}
        />
      </div>
    </header>
  );
}
