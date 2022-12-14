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
        'bg-zinc-800 bg-opacity-0 hover:bg-opacity-50 px-4 text-center h-12 flex items-center transition font-medium cursor-pointer',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default TitlebarButton;
