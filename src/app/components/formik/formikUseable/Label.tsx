import { InputProps } from "../Input";

export default function PageLabel(props: InputProps) {
  return (
    <label
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      htmlFor={props.name}
    >
      {props.label}
    </label>
  );
}
