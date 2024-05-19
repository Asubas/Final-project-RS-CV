import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type buttonElement = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
const customButton = (props: buttonElement) => {
  return <button {...props}></button>;
};

export default customButton;
