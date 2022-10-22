import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Wrapper(props: Props) {
  return <div className="pt-16">{props.children}</div>;
}

export default Wrapper;
