import clsx from "clsx";
import { useId } from "react";
import FieldLabel from "@/components/Form/FieldLabel";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  wrapperClass?: string;
}

export const Input = ({
  label,
  className,
  wrapperClass,
  ...props
}: InputProps) => {
  const fieldId = useId();

  return (
    <div className={clsx("relative min-w-[300px]", wrapperClass)}>
      <input
        id={fieldId}
        className={clsx(
          `peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all  focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${className}`,
          label && "border-t-transparent focus:border-t-transparent",
          className
        )}
        {...props}
      />

      {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
    </div>
  );
};

export default Input;
