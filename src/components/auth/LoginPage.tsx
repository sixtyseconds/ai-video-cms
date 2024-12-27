import { Video } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { LoginFeatures } from './LoginFeatures';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] flex">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Sixty Seconds</h1>
          </div>
          
          <h2 className="text-xl text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Sign in to your account to continue</p>
          
          <LoginForm />
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex w-1/2 bg-[#13151A] items-center justify-center p-8">
        <LoginFeatures />
      </div>
    </div>
  );
}