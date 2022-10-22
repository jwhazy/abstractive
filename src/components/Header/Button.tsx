import { ReactNode } from 'react';
import clsxm from '../../utils/clsxm';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

function TitlebarButton(props: Props) {
  return (
    <div
      className={clsxm(
        'bg-zinc-600 bg-opacity-0 hover:bg-opacity-100 px-4 text-center h-12 flex items-center transition cursor-pointer',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default TitlebarButton;
