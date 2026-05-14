import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(); 
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-grow justify-center items-center py-20 px-4">
      <Card className="w-full max-w-md p-8 border-outline-variant/20 shadow-xl">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-primary text-5xl">login</span>
          <h1 className="text-3xl font-headline font-bold text-primary mt-2">Logowanie</h1>
          <p className="text-slate-500 mt-2">Zaloguj się, aby uzyskać dostęp do panelu administratora.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input label="E-mail" type="email" required defaultValue="admin@example.com" />
          <Input label="Hasło" type="password" required defaultValue="password123" />
          <Button type="submit" className="w-full py-3 mt-2">
            Zaloguj
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;