
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Step1FormValues, Step2FormValues } from './signup/validation-schemas';
import Step1Form from './signup/Step1Form';
import Step2Form from './signup/Step2Form';
import SignupHeader from './signup/SignupHeader';
import LoginLink from './signup/LoginLink';

const MultiStepSignupForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = (data: Step1FormValues) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const onStep2Submit = async (values: Step2FormValues) => {
    if (!step1Data) {
      toast({
        title: 'Error',
        description: 'Missing information from step 1. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error: signUpError, data } = await signUp(values.email, values.password);
      
      if (signUpError) throw signUpError;

      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: step1Data.firstName,
            surname: step1Data.surname,
            age: parseInt(step1Data.age),
            gender: step1Data.gender,
            username: step1Data.username,
            city: values.city,
            state: values.state,
          })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.error('Profile update error:', profileError);
          throw new Error('Failed to update profile. ' + profileError.message);
        }
        
        toast({
          title: 'Account created!',
          description: 'Please check your email to confirm your account.',
        });
        
        navigate('/');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Error creating account',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto relative"
    >
      <SignupHeader step={step} />
      
      {step === 1 ? (
        <Step1Form 
          onContinue={handleContinue} 
          isLoading={isLoading}
          defaultValues={step1Data || undefined}
        />
      ) : (
        <Step2Form 
          onSubmit={onStep2Submit} 
          onBack={handleBack} 
          isLoading={isLoading}
        />
      )}

      <LoginLink />
    </motion.div>
  );
};

export default MultiStepSignupForm;
