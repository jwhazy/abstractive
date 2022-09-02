import { useNavigate } from "react-router-dom";

import clsxm from "../utils/clsxm";

export type Props = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const Button = (props: Props) => {
  const navigate = useNavigate();

  const className = clsxm(
    "ring ring-1 ring-zinc-600 text-white bg-gray-500 hover:text-white cursor-pointer mx-2 my-1 rounded-xl px-4 py-2 font-normal bg-opacity-10 hover:bg-opacity-70 shadow-xl transition",
    props.className
  );

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Button;
