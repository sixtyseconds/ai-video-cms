import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MainContent } from '@/components/layout/MainContent';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthProvider } from '@/contexts/AuthContext';
import { UIProvider } from '@/contexts/UIContext';

const queryClient = new QueryClient();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UIProvider>
          <AuthLayout>
            <div className="min-h-screen bg-[#0F1115] text-white">
              <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <MainContent />
                </div>
              </div>
            </div>
          </AuthLayout>
        </UIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;