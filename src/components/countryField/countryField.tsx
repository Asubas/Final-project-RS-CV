import { CountryField } from "../../interfaces/interfaces";

export default function CountryFieldF(props: CountryField) {
  return (
    <option value={props.value} className={props.className}>
      {props.value}
    </option>
  );
}
