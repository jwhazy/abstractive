import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

function WelcomeSuccess() {
  const navigate = useNavigate();

  const go = () => (window.location.href = '/');

  return (
    <div className="flex justify-center h-[75vh]">
      <div className="m-auto text-center space-y-4 animate__animated animate__fadeInUp">
        <div>
          <h1>Setup complete! 🎉</h1>
          <p>You can add more clients in the settings.</p>
        </div>
        <div>
          <Button onClick={go} className="w-full">
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSuccess;
