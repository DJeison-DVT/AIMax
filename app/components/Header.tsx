import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';

import React from 'react';

  
interface AvatarDemoProps {
  src: string;
  fallbackText: string;
}

const AvatarDemo: React.FC<AvatarDemoProps> = ({ src, fallbackText }) => {
  return (
    <CircleUserRound size={40} color="#FFFF"/>
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

  return (
    <header className="flex items-center justify-between p-4 bg-fondo">
      <div className="flex items-center">
        <CircleIcon />
      </div>
      <div className="flex items-center space-x-8 ml-auto">
        <nav className="flex items-center space-x-8">
        <Link href="/" className="text-white hover:underline">Home </Link>
        <Link href="/inbox" className="text-white hover:underline">Inbox </Link>
        <Link href="/profile" className="text-white hover:underline">Sign Up </Link>
        </nav>
        <AvatarDemo 
          src="https://avatars.githubusercontent.com/u/1234567" 
          fallbackText="AI"
        />
      </div>
    </header>
  );
}
