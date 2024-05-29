"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import PageTransition from "@/app/components/PageTransition";
import QuestionHeader from "@/app/components/QuestionHeader";
import SelectionButton from "@/app/components/SelectionButton";
import pages from "@/app/routes/routes";

export default function SpecialAttention() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");
  const router = useRouter();
  const currentPageIndex = pages.indexOf("/initial-preferences/special-attention");

  useEffect(() => {
    const savedOption = localStorage.getItem("specialAttention");
    if (savedOption) {
      const parsedOption = JSON.parse(savedOption);
      setSelectedOption(parsedOption.option);
      setDetails(parsedOption.details || "");
    }
  }, []);

  const toggleSelection = (option: string) => {
    setSelectedOption(option);
    if (option === "No") {
      setDetails("");
    }
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const saveSelection = () => {
    if (selectedOption) {
      const specialAttention = {
        option: selectedOption,
        details: details,
      };
      localStorage.setItem("specialAttention", JSON.stringify(specialAttention));
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
          <QuestionHeader title="¿Requiere atención especializada?" description="(problemas de aprendizaje, problemas de la vista, problemas de audición, problemas de atención, etc)" />
          <div className="flex flex-wrap justify-center mb-4">
            {["Si", "No"].map((option) => (
              <SelectionButton
                key={option}
                option={option}
                isSelected={selectedOption === option}
                onSelect={toggleSelection}
              />
            ))}
            {selectedOption === "Si" && (
              <input
                type="text"
                placeholder="Con qué"
                value={details}
                onChange={handleDetailsChange}
                className="m-2 p-2 border-2 rounded-full bg-white text-custom-orange border-custom-orange"
              />
            )}
          </div>
        </PageTransition>
      </div>
      <Footer onBack={goBack} onNext={saveSelection} />
    </div>
  );
}
