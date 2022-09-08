import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

function Welcome() {
  const navigate = useNavigate();

  const start = () => navigate('/welcome/client');

  return (
    <div className="flex justify-center h-[90vh]">
      <div className="m-auto text-center space-y-4">
        <div className="animate__animated animate__fadeInDown">
          <h1>Welcome to Abstractive</h1>
          <p>We&apos;re glad you&apos;re here. Let&apos;s get started.</p>
        </div>
        <div className="animate__animated animate__fadeInUp">
          <Button onClick={start} className="w-1/2">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
