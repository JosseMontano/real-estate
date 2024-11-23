import { useLanguageStore } from "@/core/store/language";
import { LanguageDB } from "@/shared/types/language";
import React, { useState } from "react";

export interface Option {
  name: LanguageDB;
  id: number;
}

interface SelectProps {
  value: any;
  onChange: (value: Option) => void;
  options: Option[];
}

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };
  const { language,texts } = useLanguageStore();

  return (
    <div className="relative inline-block w-full">
      <div
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || texts.select}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.name[language]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
