import { ErrorMessage, Field } from "formik";
import PageLabel from "./formikUseable/Label";
import { InputProps } from "./Input";
import TextError from "./TextError";

export default function Select(props: InputProps) {
  const {
    label,
    name,
    classnew = "",
    pencarian,
    toucheds,
    error,
    option,
    ...rest
  } = props;
  return (
    <div>
      <PageLabel label={label} name={name} />

      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className={
          toucheds && error
            ? "block w-full p-2 mb-3 text-sm text-black border border-red-400 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            : "block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }
      >
        {option?.map((ops) => {
          return (
            <option key={ops.key} value={ops?.key}>
              {ops.value}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
