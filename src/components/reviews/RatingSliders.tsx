
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from '@/hooks/useReviewForm';

interface RatingSlidersProps {
  form: UseFormReturn<ReviewFormValues>;
}

const RatingSliders: React.FC<RatingSlidersProps> = ({ form }) => {
  const formatRating = (value: number) => {
    // Round to nearest 0.25
    return (Math.round(value * 4) / 4).toFixed(2).replace(/\.00$/, '');
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Rate the Supper Club</h3>
      
      <FormField
        control={form.control}
        name="foodRating"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel>Food</FormLabel>
              <span className="text-sm font-medium">{formatRating(field.value)}</span>
            </div>
            <FormControl>
              <Slider
                defaultValue={[field.value]}
                min={0}
                max={5}
                step={0.25}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="vibeRating"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel>Vibe</FormLabel>
              <span className="text-sm font-medium">{formatRating(field.value)}</span>
            </div>
            <FormControl>
              <Slider
                defaultValue={[field.value]}
                min={0}
                max={5}
                step={0.25}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="overallRating"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel>Overall Experience</FormLabel>
              <span className="text-sm font-medium">{formatRating(field.value)}</span>
            </div>
            <FormControl>
              <Slider
                defaultValue={[field.value]}
                min={0}
                max={5}
                step={0.25}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default RatingSliders;
