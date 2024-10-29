type OptionsType = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionsType[];
};
const Select = ({ options, onChange, value }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-900"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
