import Input from "./Input";
import Select from "./SelectFormik";

interface InputForm {
  control: string;
  name: string;
  [key: string]: any;
}

export default function FormikControl(props: InputForm) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "select":
      return <Select {...rest} />;

    default:
      return null;
  }
}
