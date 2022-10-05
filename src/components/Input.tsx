import { HTMLProps, InputHTMLAttributes } from 'react';
import clsxm from '../utils/clsxm';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
  className?: string;
};

function Input({ children, ...props }: Props & HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsxm(
        'py-2 px-3 w-full focus:shadow-xl h-10 transition rounded-xl bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent',
        props.className
      )}
    />
  );
}

export default Input;
