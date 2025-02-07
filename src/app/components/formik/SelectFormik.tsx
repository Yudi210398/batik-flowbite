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
  console.log(option, `lers`);
  return (
    <div>
      <PageLabel label={label} name={name} />

      <Field as="select" id={name} name={name} {...rest}>
        {option?.map((ops) => {
          return (
            <option key={ops.key} value={ops?.value}>
              {ops.value}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
