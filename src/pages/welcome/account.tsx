import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

function WelcomeAccount() {
  const navigate = useNavigate();

  const login = () => navigate('https://localhost:3000/api/accounts/auth');
  const skip = () => navigate('/welcome/success');

  return (
    <div className="flex h-[90vh]">
      <div className="m-auto space-y-4 w-1/2">
        <div className="animate__animated animate__fadeInDown">
          <h1>Abstractive Account</h1>
          <p>To upload and edit mods, you will need to log in.</p>
        </div>
        <div className="animate__animated animate__fadeInUp">
          <div className="flex space-x-2">
            <Button className="ml-0" onClick={login}>
              Log in with Discord
            </Button>
            <Button onClick={skip}>Skip</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeAccount;
