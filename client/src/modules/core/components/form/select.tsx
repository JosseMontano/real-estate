import { useLanguageStore } from "@/core/store/language";
import { LanguageDB } from "@/shared/types/language";
import React, { useState } from "react";

export interface Option {
  name: LanguageDB;
  id: number | string;
}

interface SelectProps {
  value: any;
  onChange: (value: Option) => void;
  options: Option[];
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };
  const { language, texts } = useLanguageStore();

  return (
    <div className="md:relative inline-block w-full">
      <div
        className={`block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || texts.select}
      </div>
      {isOpen && (
        <ul className="realative md:absolute  z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.name && option.name[language]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
