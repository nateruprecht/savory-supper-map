
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, MapPin, ChevronLeft, Facebook } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Step2FormValues, step2Schema } from './validation-schemas';

interface Step2FormProps {
  onSubmit: (data: Step2FormValues) => void;
  onBack: () => void;
  isLoading: boolean;
}

const Step2Form: React.FC<Step2FormProps> = ({ onSubmit, onBack, isLoading }) => {
  const form = useForm<Step2FormValues>({
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

  return (
    <Form {...form}>
      <button 
        onClick={onBack}
        className="absolute top-0 left-0 p-3 text-supper-brown hover:text-supper-red transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-supper-brown font-medium">City</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-supper-amber" />
                  <Input 
                    placeholder="Your city" 
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
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-supper-brown font-medium">State</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-supper-amber" />
                  <Input 
                    placeholder="Your state" 
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-supper-brown font-medium">Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-supper-amber" />
                  <Input 
                    placeholder="Your email" 
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
                    placeholder="Create a password" 
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
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-supper-brown font-medium">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-supper-amber" />
                  <Input 
                    placeholder="Confirm password" 
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
              Creating...
            </div>
          ) : (
            <>Create Account</>
          )}
        </Button>
        
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="h-px bg-border flex-1"></div>
          <span className="text-xs text-muted-foreground px-2">or sign up with</span>
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
      </form>
    </Form>
  );
};

export default Step2Form;
