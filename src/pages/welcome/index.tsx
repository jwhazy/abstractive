import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Welcome = () => {
  const navigate = useNavigate();

  const start = () => navigate("/welcome/client");

  return (
    <div className="flex justify-center h-[90vh]">
      <div className="m-auto text-center space-y-4">
        <div className="animate__animated animate__fadeInDown">
          <h1>Welcome to Abstractive</h1>
          <p>We're glad you're here. Let's get started.</p>
        </div>
        <div className="animate__animated animate__fadeInUp">
          <Button onClick={start} className="w-1/2">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
