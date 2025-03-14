import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser, sampleSupperClubs } from '@/lib/data';
import { SupperClub, Review } from '@/lib/types';
import { toast } from 'sonner';
import ProfileLayout from '@/components/profile/ProfileLayout';

// Define a type for the review with the club included
type UserReviewWithClub = Review & { club: SupperClub };

const UserReviews = () => {
  const navigate = useNavigate();
  const [user] = useState(currentUser);
  const clubs = sampleSupperClubs;
  const [filter, setFilter] = useState<'all' | 'recent' | 'highest' | 'lowest'>('all');
  
  // Get all reviews by this user
  const userReviews: UserReviewWithClub[] = [];
  
  clubs.forEach(club => {
    club.reviews.forEach(review => {
      if (review.userId === user.id) {
        userReviews.push({
          ...review,
          club
        });
      }
    });
  });
  
  // Sort reviews based on filter
  const sortedReviews = [...userReviews].sort((a, b) => {
    if (filter === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (filter === 'highest') {
      return b.rating - a.rating;
    } else if (filter === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });
  
  // Handle add review button click
  const handleAddReview = () => {
    toast.info("Add review feature will open club selection dialog");
  };
  
  return (
    <ProfileLayout 
      user={user} 
      activeTab="profile" 
      backLink={{
        text: "",
        route: "/profile"
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Your Reviews</h1>
          </div>
          
          <Button onClick={handleAddReview}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add a Review
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="highest">Highest Rated</TabsTrigger>
            <TabsTrigger value="lowest">Lowest Rated</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {sortedReviews.length > 0 ? renderReviews(sortedReviews) : renderEmptyState()}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-4">
            <div className="space-y-4">
              {sortedReviews.length > 0 ? renderReviews(sortedReviews) : renderEmptyState()}
            </div>
          </TabsContent>
          
          <TabsContent value="highest" className="mt-4">
            <div className="space-y-4">
              {sortedReviews.length > 0 ? renderReviews(sortedReviews) : renderEmptyState()}
            </div>
          </TabsContent>
          
          <TabsContent value="lowest" className="mt-4">
            <div className="space-y-4">
              {sortedReviews.length > 0 ? renderReviews(sortedReviews) : renderEmptyState()}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProfileLayout>
  );
};

// Helper function to render reviews
const renderReviews = (reviews: UserReviewWithClub[]) => {
  return reviews.map(review => (
    <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-start">
        <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
          <img 
            src={review.club.image} 
            alt={review.club.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{review.club.name}</h3>
              <p className="text-xs text-muted-foreground">{review.club.address}</p>
            </div>
            <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
              <span className="font-medium mr-1">{review.rating}</span>
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
          </div>
          
          <p className="text-sm my-2">{review.comment}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Food</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.foodRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Service</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.serviceRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Ambience</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.ambienceRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-3">
            <div className="text-xs text-muted-foreground">{review.date}</div>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Edit Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));
};

// Helper function to render empty state
const renderEmptyState = () => (
  <div className="text-center py-16 bg-white rounded-lg shadow-sm">
    <Star className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
    <p className="text-muted-foreground mb-2">You haven't reviewed any supper clubs yet.</p>
    <p className="text-sm text-muted-foreground">Once you add reviews, they'll appear here.</p>
  </div>
);

export default UserReviews;
