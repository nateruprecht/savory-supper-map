
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// Schema for step 1 - completely revised
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
    // Validate step 1 fields
    const step1Valid = await step1Form.trigger();
    
    if (step1Valid) {
      // Save step 1 data
      setStep1Data(step1Form.getValues());
      setStep(2);
    } else {
      // If validation fails, show a toast
      toast({
        title: 'Please complete all required fields',
        description: 'Make sure all fields are filled out correctly.',
        variant: 'destructive',
      });
    }
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
      // Create the user account
      const { error: signUpError, data } = await signUp(values.email, values.password);
      
      if (signUpError) throw signUpError;
      
      if (data) {
        // Update the profile with additional information
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
          .eq('id', data.user?.id);
        
        if (profileError) throw profileError;
        
        toast({
          title: 'Account created!',
          description: 'Please check your email to confirm your account.',
        });
        
        // Navigate to welcome screen or home
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
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
      
      <h1 className="text-2xl font-bold text-center mb-2">SupperClubs</h1>
      <p className="text-center text-muted-foreground mb-6">
        Join now to discover the best supper clubs!
      </p>

      {step === 1 ? (
        <Form {...step1Form}>
          <form className="space-y-4">
            <FormField
              control={step1Form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="First Name" 
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="Surname" 
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your age" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {renderAgeOptions()}
                    </SelectContent>
                  </Select>
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
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={step1Form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Username" 
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="City" 
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="State" 
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="Email Address" 
                      type="email"
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="Password" 
                      type="password"
                      {...field} 
                      disabled={isLoading}
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="Confirm Password" 
                      type="password"
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-12 bg-supper-navy hover:bg-supper-navy/90 mt-6" 
              disabled={isLoading}
            >
              Create Account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?
          <button
            type="button"
            onClick={goToLogin}
            className="ml-1 text-primary font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default MultiStepSignupForm;
