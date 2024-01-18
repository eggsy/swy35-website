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
          "peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-[0.700rem] text-sm font-normal text-blue-gray-700 transition-colors focus:border-gray-900 focus:outline-0",
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
