import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

const TitlebarButton = (props: Props) => {
  return (
    <div
      className="bg-black bg-opacity-0 hover:bg-opacity-50 px-4 text-center h-full flex items-center transition cursor-pointer"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default TitlebarButton;
