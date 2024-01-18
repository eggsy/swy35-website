import { useId } from "react";
import clsx from "clsx";
import { TbChevronDown } from "react-icons/tb";
import FieldLabel from "@/components/Form/FieldLabel";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
  wrapperClass?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  className,
  wrapperClass,
  ...props
}: SelectProps) => {
  const fieldId = useId();

  return (
    <div className={clsx("relative min-w-[200px]", wrapperClass)}>
      <select
        id={fieldId}
        value={value}
        onChange={onChange}
        className={clsx(
          `peer h-full appearance-none outline outline-0 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 transition-all focus:border-gray-900`,
          label && "border-t-transparent focus:border-t-transparent",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="absolute top-0 right-2 h-full flex items-center justify-center pointer-events-none">
        <TbChevronDown className="w-4 h-4 text-black/50 peer-focus:text-gray-900" />
      </div>

      {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
    </div>
  );
};

export default Select;
