export const FieldLabel = ({
  children,
  ...props
}: React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) => (
  <label
    className="before:content[' '] whitespace-nowrap after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-focus:before:border-t peer-focus:before:border-l peer-focus:before:border-gray-900 peer-focus:after:border-t peer-focus:after:border-r peer-focus:after:border-gray-900"
    {...props}
  >
    {children}
  </label>
);

export default FieldLabel;
