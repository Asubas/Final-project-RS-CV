import './button.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type buttonElement = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
};
const customButton = (props: buttonElement) => {
  return <button {...props}>{props.text}</button>;
};

export default customButton;
