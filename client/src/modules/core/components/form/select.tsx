import React, { useState } from "react";

interface Option {
  value: string;
  id?: string;
}

interface SelectProps {
  value: any;
  onChange: (value: any) => void;
  options: Option[];
}

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Selecionar..."}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;