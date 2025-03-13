
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import MultiStepSignupForm from '@/components/auth/MultiStepSignupForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserProfile from '@/hooks/use-user-profile';

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { getUserProfile } = useUserProfile();

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
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        
        <TabsContent value="signup">
          <MultiStepSignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
