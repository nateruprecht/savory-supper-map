
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Calendar, Users, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Step1FormValues, step1Schema } from './validation-schemas';

interface Step1FormProps {
  onContinue: (data: Step1FormValues) => void;
  isLoading: boolean;
  defaultValues?: Step1FormValues;
}

const Step1Form: React.FC<Step1FormProps> = ({ onContinue, isLoading, defaultValues }) => {
  const { toast } = useToast();
  
  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: defaultValues || {
      firstName: '',
      surname: '',
      age: '',
      gender: '',
      username: '',
    },
    mode: 'onChange',
  });

  const handleContinue = async () => {
    const step1Valid = await form.trigger();
    
    if (step1Valid) {
      onContinue(form.getValues());
    } else {
      toast({
        title: 'Please complete all required fields',
        description: 'Make sure all fields are filled out correctly.',
        variant: 'destructive',
      });
    }
  };

  const renderAgeOptions = () => {
    const options = [];
    for (let i = 16; i <= 85; i++) {
      options.push(<SelectItem key={i} value={i.toString()}>{i}</SelectItem>);
    }
    return options;
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
  );
};

export default Step1Form;
