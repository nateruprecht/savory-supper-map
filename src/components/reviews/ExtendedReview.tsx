
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from '@/hooks/useReviewForm';

interface ExtendedReviewProps {
  form: UseFormReturn<ReviewFormValues>;
}

/**
 * ExtendedReview component for collecting detailed review information
 * 
 * This component handles the extended review section of the supper club review form,
 * including a textarea for comments and placeholder for future specific questions.
 */
const ExtendedReview: React.FC<ExtendedReviewProps> = ({ form }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Extended Review</h3>
      <div className="bg-gray-100 p-3 rounded-md">
        <p className="text-xs text-gray-500">
          This section will include specific questions for each individual supper club in a future update
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Review</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Share your experience..." 
                className="h-24"
                aria-label="Your detailed review comments" 
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ExtendedReview;
