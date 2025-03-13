
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
    <div className="min-h-screen bg-supper-cream/50 retro-pattern">
      <div className="container flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-supper-amber/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-supper-red via-supper-amber to-supper-gold"></div>
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-supper-cream flex items-center justify-center shadow-md border-2 border-supper-red/20">
              <img 
                src="/placeholder.svg" 
                alt="Supper Club Logo" 
                className="h-12 w-12" 
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-center mb-2 text-supper-red">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-8 font-medium">
            Sign in to continue your supper club journey
          </p>

          <div className="retro-divider mb-8"></div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
