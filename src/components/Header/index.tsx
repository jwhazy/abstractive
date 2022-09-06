import { appWindow } from "@tauri-apps/api/window";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const close = () => appWindow.close();

  const navigate = useNavigate();

  const minimize = () => appWindow.minimize();

  return (
    <div
      className="flex justify-between pl-4 h-7 sticky w-full animate__animated animate__fadeInDown"
      data-tauri-drag-region
    >
      <div>
        <h4 className="font-black" onClick={() => navigate("/")}>
          ABSTRACTIVE
        </h4>
      </div>
      <div className="flex flex-row-reverse items-center text-center">
        <Button onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
        <Button onClick={minimize}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-white mt-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </Button>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Header;