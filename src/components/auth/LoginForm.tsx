
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Facebook } from 'lucide-react';
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
    navigate('/signup');
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-supper-brown font-medium">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-supper-amber" />
                    <Input 
                      placeholder="Your email address" 
                      type="email"
                      className="pl-10 h-12 border-supper-cream bg-background/50 focus-visible:ring-supper-amber"
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
                <FormLabel className="text-supper-brown font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-supper-amber" />
                    <Input 
                      placeholder="Your password" 
                      type="password"
                      className="pl-10 h-12 border-supper-cream bg-background/50 focus-visible:ring-supper-amber"
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
            className="w-full h-12 bg-supper-red hover:bg-supper-red/90 text-white font-medium text-base mt-6" 
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

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={goToSignup}
            className="text-supper-red font-medium hover:underline"
          >
            Sign up
          </button>
        </p>

        <div className="flex items-center justify-center gap-2 my-4">
          <div className="h-px bg-border flex-1"></div>
          <span className="text-xs text-muted-foreground px-2">or continue with</span>
          <div className="h-px bg-border flex-1"></div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-supper-navy/20 hover:bg-supper-navy/5 text-supper-navy"
          disabled={isLoading}
        >
          <Facebook className="mr-2 h-5 w-5" />
          Continue with Facebook
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
