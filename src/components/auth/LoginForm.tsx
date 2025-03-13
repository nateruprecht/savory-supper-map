
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) throw error;
      
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'Please check your credentials and try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignup = () => {
    navigate('/welcome');
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Your email address" 
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
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Your password" 
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

          <Button 
            type="submit" 
            className="w-full h-12 bg-supper-navy hover:bg-supper-navy/90 mt-6" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={goToSignup}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
