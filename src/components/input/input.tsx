import { InputHTMLAttributes, Ref, forwardRef } from 'react';

type InputElementProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
};
const customInput = forwardRef<HTMLInputElement, InputElementProps>(
  (props: InputElementProps, ref?: Ref<HTMLInputElement>) => {
    const { ...restProps } = props;
    return <input {...restProps} ref={ref} />;
  },
);
customInput.displayName = 'customInput';
export default customInput;
