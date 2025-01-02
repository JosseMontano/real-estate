import { useLanguageStore } from "@/core/store/language";
import { LanguageDB } from "@/shared/types/language";
import React, { useEffect, useRef, useState } from "react";

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
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };
  const { language, texts } = useLanguageStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="md:relative inline-block w-full">
      <div
        className={`block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || texts.select}
      </div>
      {isOpen && (
        <ul className="realative md:absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
          <li
            className="px-3 py-2 cursor-pointer hover:bg-gray-200 border-b-2 border-gray-200"
            onClick={() =>
              handleOptionClick({
                name: { es: "Todos", en: "All", pt: "Todos" },
                id: 0,
              })
            }
          >
            Todos
          </li>
          {options.map((option) => (
            <li
              key={option.id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200 border-b-2 border-gray-200"
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
