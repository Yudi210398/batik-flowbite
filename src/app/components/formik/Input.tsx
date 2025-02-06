import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

export interface InputProps {
  label?: string;
  name: string;
  classnew?: string;
  pencarian?: string;
  error?: string;
  toucheds?: boolean;
  type?: string;
  placeholder?: string;
  option: string | number;
  [key: string]: any;
}

export default function Input(props: InputProps) {
  const {
    label,
    name,
    classnew = "",
    pencarian,
    toucheds,
    error,
    ...rest
  } = props;

  return (
    <div className="bungkus">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className={
          toucheds && error
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }
        id={name}
        name={name}
        {...rest}
      />

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
