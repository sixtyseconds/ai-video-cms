import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from './LoginPage';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginPage />;
  }

  return children;
}