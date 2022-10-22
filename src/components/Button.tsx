import { ButtonHTMLAttributes, HTMLProps } from 'react';
import clsxm from '../utils/clsxm';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

function Button({ children, ...props }: Props & HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className={clsxm(
        'rounded-xl bg-zinc-800 px-4 py-2 text-white ring-1 ring-zinc-600 transition-all hover:bg-zinc-600 hover:font-medium',
        props.className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
