"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/login'); // Ruta a la página de login
  };

  return (
    <main className="w-full h-screen flex flex-col">
      <div className="bg-custom-yellow bg-cover bg-center h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-start w-full overflow-hidden">
          <img src="/lp-aimax.png" className="w-[750px] h-[480px] rounded-3xl -translate-x-10" /> 
          <div className="ml-40">
            <h1 className="text-white text-7xl font-light italic mb-4">AIMAX</h1>
            <button
              className="bg-custom-orange w-40 font-light italic text-white py-2 px-4 rounded-3xl"
              onClick={handleStartClick}
            >
              START
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
