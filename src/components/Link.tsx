import { AnchorHTMLAttributes, HTMLProps } from 'react';
import { useNavigate } from 'react-router-dom';
import clsxm from '../utils/clsxm';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  className?: string;
};

function Link({ children, ...props }: Props & HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      type="button"
      className={clsxm(
        'font-medium cursor-pointer flex items-center text-center w-max h-max',
        props.className
      )}
    >
      {children}
    </a>
  );
}

export default Link;
