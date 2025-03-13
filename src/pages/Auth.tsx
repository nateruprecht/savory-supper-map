
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import SignUpForm from '@/components/auth/SignUpForm';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import useUserProfile from '@/hooks/use-user-profile';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createUserProfile } = useUserProfile();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  // Create a user profile from the auth user
  const userForHeader = createUserProfile(user);

  return (
    <div className="min-h-screen bg-background relative">
      <Header 
        user={userForHeader} 
        onProfileClick={() => navigate('/profile')}
      />

      <main className="pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/placeholder.svg" 
                  alt="Supper Club Logo" 
                  className="h-14 w-auto" 
                />
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">
                {isLogin ? "Welcome back" : "Create your account"}
              </h1>
              
              <p className="text-center text-muted-foreground mb-6">
                {isLogin 
                  ? "Sign in to access your account" 
                  : "Join the Wisconsin Supper Club community"}
              </p>

              {isLogin ? (
                <LoginForm />
              ) : (
                <SignUpForm />
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-primary font-medium hover:underline"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Navigation
        activeTab="auth"
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Auth;
