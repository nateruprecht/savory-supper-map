
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Slider } from "@/components/ui/slider";
import { Search, Plus } from 'lucide-react';
import { SupperClub } from '@/lib/types';

const reviewFormSchema = z.object({
  clubId: z.string().optional(),
  clubName: z.string().min(1, "Club name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  foodRating: z.number().min(0).max(5),
  vibeRating: z.number().min(0).max(5),
  overallRating: z.number().min(0).max(5),
  comment: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

type SupperClubReviewFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReviewFormValues) => void;
  clubs: SupperClub[];
  preselectedClub?: SupperClub;
};

const SupperClubReviewForm: React.FC<SupperClubReviewFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  clubs,
  preselectedClub
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SupperClub[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      clubName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      foodRating: 2.5,
      vibeRating: 2.5,
      overallRating: 2.5,
      comment: "",
    },
  });

  // Set the preselected club if provided
  useEffect(() => {
    if (preselectedClub) {
      setSelectedClub(preselectedClub);
      form.setValue("clubId", preselectedClub.id);
      form.setValue("clubName", preselectedClub.name);
      form.setValue("address", preselectedClub.address);
      form.setValue("city", preselectedClub.city);
      form.setValue("state", preselectedClub.state);
      setSearchQuery(preselectedClub.name);
    }
  }, [preselectedClub, form]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsSearching(true);
      // Filter clubs based on the search query
      const results = clubs.filter(club => 
        club.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSelectClub = (club: SupperClub) => {
    setSelectedClub(club);
    form.setValue("clubId", club.id);
    form.setValue("clubName", club.name);
    form.setValue("address", club.address);
    form.setValue("city", club.city);
    form.setValue("state", club.state);
    setIsSearching(false);
    setShowAddNew(false);
  };

  const handleAddNew = () => {
    setSelectedClub(null);
    form.setValue("clubId", undefined);
    form.setValue("clubName", searchQuery);
    form.setValue("address", "");
    form.setValue("city", "");
    form.setValue("state", "");
    form.setValue("zipCode", "");
    setShowAddNew(true);
    setIsSearching(false);
  };

  const formatRating = (value: number) => {
    // Round to nearest 0.25
    return (Math.round(value * 4) / 4).toFixed(2).replace(/\.00$/, '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Supper Club Review</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {!preselectedClub && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Search or add Supper Club</h3>
                    <Button 
                      type="button" 
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={handleAddNew}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search supper clubs..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    
                    {isSearching && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {searchResults.length > 0 ? (
                          searchResults.map((club) => (
                            <div
                              key={club.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectClub(club)}
                            >
                              {club.name} - {club.city}, {club.state}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 space-y-2">
                            <p className="text-sm text-gray-500">No results found</p>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full text-sm"
                              onClick={handleAddNew}
                            >
                              Add "{searchQuery}" as new supper club
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {(showAddNew || selectedClub || preselectedClub) && (
                <>
                  <FormField
                    control={form.control}
                    name="clubName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Club Name</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly={!!selectedClub || !!preselectedClub} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {showAddNew && (
                    <>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}
            </div>
            
            {(showAddNew || selectedClub || preselectedClub) && (
              <>
                <div className="space-y-6 pt-4">
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                >
                  Submit Review
                </Button>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SupperClubReviewForm;
