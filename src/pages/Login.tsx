
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // If user is already logged in, redirect to home
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-supper-cream flex items-center justify-center shadow-md">
            <img 
              src="/placeholder.svg" 
              alt="Supper Club Logo" 
              className="h-10 w-10" 
            />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-muted-foreground mb-6">
          Sign in to continue your supper club journey
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
