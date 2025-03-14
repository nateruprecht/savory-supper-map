
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SupperClub } from '@/lib/types';

export const reviewFormSchema = z.object({
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

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface UseReviewFormProps {
  clubs: SupperClub[];
  preselectedClub?: SupperClub;
  onSubmit: (data: ReviewFormValues) => void;
}

export const useReviewForm = ({ clubs, preselectedClub, onSubmit }: UseReviewFormProps) => {
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

  return {
    form,
    searchQuery,
    searchResults,
    isSearching,
    selectedClub,
    showAddNew,
    handleSearch,
    handleSelectClub,
    handleAddNew,
    handleSubmit: form.handleSubmit(onSubmit)
  };
};
