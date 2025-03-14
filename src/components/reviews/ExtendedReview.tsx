
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from '@/hooks/useReviewForm';

interface ExtendedReviewProps {
  form: UseFormReturn<ReviewFormValues>;
}

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
              <Textarea {...field} placeholder="Share your experience..." className="h-24" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ExtendedReview;
