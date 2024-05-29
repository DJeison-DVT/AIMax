"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import PageTransition from "@/app/components/PageTransition";
import QuestionHeader from "@/app/components/QuestionHeader";
import SelectionButton from "@/app/components/SelectionButton";
import pages from "@/app/routes/routes";

export default function LearnLanguage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  const currentPageIndex = pages.indexOf("/initial-preferences/learn-language");

  useEffect(() => {
    const savedOption = localStorage.getItem("learnLanguage");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  const toggleSelection = (option: string) => {
    setSelectedOption(option);
  };

  const saveSelection = () => {
    if (selectedOption) {
      localStorage.setItem("learnLanguage", selectedOption);
      if (currentPageIndex < pages.length - 1) {
        router.push(pages[currentPageIndex + 1]);
      }
    } else {
      alert("Por favor seleccione una opción.");
    }
  };

  const goBack = () => {
    if (currentPageIndex > 0) {
      router.push(pages[currentPageIndex - 1]);
    } else {
      alert("Esta es la primera página");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center bg-custom-yellow">
        <PageTransition>
          <QuestionHeader title="¿Con qué idioma esperas aprender tus lecciones?" description="Selecciona un idioma" />
          <div className="flex flex-wrap justify-center mb-4">
            {["Español", "English", "Français", "中国人", "Deutsch", "otro"].map((option) => (
              <SelectionButton
                key={option}
                option={option}
                isSelected={selectedOption === option}
                onSelect={toggleSelection}
              />
            ))}
          </div>
        </PageTransition>
      </div>
      <Footer onBack={goBack} onNext={saveSelection} />
    </div>
  );
}
