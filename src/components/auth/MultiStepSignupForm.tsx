
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ChevronRight, User, Mail, Lock, MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// Schema for step 1
const step1Schema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  surname: z.string().min(1, { message: 'Surname is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
});

// Schema for step 2
const step2Schema = z.object({
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Types for form values
type Step1FormValues = z.infer<typeof step1Schema>;
type Step2FormValues = z.infer<typeof step2Schema>;

const MultiStepSignupForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form for step 1
  const step1Form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: '',
      surname: '',
      age: '',
      gender: '',
      username: '',
    },
    mode: 'onChange',
  });

  // Form for step 2
  const step2Form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      city: '',
      state: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  // Handle Continue button click for step 1
  const handleContinue = async () => {
    const step1Valid = await step1Form.trigger();
    
    if (step1Valid) {
      setStep1Data(step1Form.getValues());
      setStep(2);
    } else {
      toast({
        title: 'Please complete all required fields',
        description: 'Make sure all fields are filled out correctly.',
        variant: 'destructive',
      });
    }
  };

  // Handle back button click
  const handleBack = () => {
    setStep(1);
  };

  // Handle submit for step 2
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
      // First, create the user account with Supabase auth
      const { error: signUpError, data } = await signUp(values.email, values.password);
      
      if (signUpError) throw signUpError;

      if (data?.user) {
        // Now update the profile information
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

  const renderAgeOptions = () => {
    const options = [];
    for (let i = 16; i <= 85; i++) {
      options.push(<SelectItem key={i} value={i.toString()}>{i}</SelectItem>);
    }
    return options;
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-supper-cream flex items-center justify-center shadow-md">
          <img 
            src="/placeholder.svg" 
            alt="Supper Club Logo" 
            className="h-10 w-10" 
          />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Join SupperClubs</h1>
      <p className="text-center text-muted-foreground mb-6">
        Create an account to discover the best supper clubs
      </p>

      {/* Progress indicator */}
      <div className="mb-6 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-supper-red' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-supper-red' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      {step === 1 ? (
        <Form {...step1Form}>
          <form className="space-y-4">
            <FormField
              control={step1Form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="First Name" 
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step1Form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Surname" 
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step1Form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select your age" />
                        </SelectTrigger>
                        <SelectContent>
                          {renderAgeOptions()}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step1Form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step1Form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Choose a username" 
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="button" 
              className="w-full h-12 bg-supper-navy hover:bg-supper-navy/90 mt-6" 
              disabled={isLoading}
              onClick={handleContinue}
            >
              Continue
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...step2Form}>
          <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
            <FormField
              control={step2Form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Your city" 
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step2Form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Your state" 
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step2Form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Your email" 
                        type="email"
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step2Form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Create a password" 
                        type="password"
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step2Form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Confirm password" 
                        type="password"
                        className="pl-10"
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 mt-6">
              <Button 
                type="button" 
                variant="outline"
                className="w-1/3 h-12"
                onClick={handleBack}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="w-2/3 h-12 bg-supper-navy hover:bg-supper-navy/90" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  <>Create Account</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={goToLogin}
            className="text-primary font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default MultiStepSignupForm;
