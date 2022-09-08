import clsxm from '../utils/clsxm';

type Props = {
  className?: string;
};

function Spinner(props: Props) {
  const className = clsxm('spinner m-[100px]', props.className);
  return <div className={className} />;
}

export default Spinner;
