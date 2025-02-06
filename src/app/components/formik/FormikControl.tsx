import Input from "./Input";

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
    default:
      return null;
  }
}
