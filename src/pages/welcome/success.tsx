import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const WelcomeSuccess = () => {
  const navigate = useNavigate();

  const go = () => navigate("/");

  return (
    <div className="flex justify-center h-[90vh]">
      <div className="m-auto text-center space-y-4">
        <div className="animate__animated animate__fadeInDown">
          <h1>Setup complete! 🎉</h1>
          <p>You can add more clients in the settings.</p>
        </div>
        <div className="animate__animated animate__fadeInUp">
          <Button onClick={go} className="w-1/2">
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSuccess;
