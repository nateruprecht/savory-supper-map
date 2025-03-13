import React, { useState } from 'react';
import { SupperClub } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ClubCard from '@/components/ClubCard';
import { cn } from '@/lib/utils';
type DiscoverListProps = {
  clubs: SupperClub[];
  onClubSelect: (club: SupperClub) => void;
  onVisitToggle: (clubId: string) => void;
};
const DiscoverList: React.FC<DiscoverListProps> = ({
  clubs,
  onClubSelect,
  onVisitToggle
}) => {
  const [activeTab, setActiveTab] = useState('nearby');

  // Sort clubs by distance (mock implementation, would use geolocation in real app)
  const nearby = [...clubs].sort((a, b) => Math.random() - 0.5);

  // Sort clubs by rating
  const topRated = [...clubs].sort((a, b) => b.rating - a.rating);

  // Sort by "trending" (mock implementation, would be based on recent visits/reviews)
  const trending = [...clubs].sort((a, b) => Math.random() - 0.5);
  return <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 py-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="nearby">Nearby</TabsTrigger>
          <TabsTrigger value="top">Top Rated</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nearby" className="space-y-3 mt-2">
          {nearby.slice(0, 5).map(club => <ClubCard key={club.id} club={club} onClick={() => onClubSelect(club)} onVisitToggle={() => onVisitToggle(club.id)} compact />)}
        </TabsContent>
        
        <TabsContent value="top" className="space-y-3 mt-2">
          {topRated.slice(0, 5).map(club => <ClubCard key={club.id} club={club} onClick={() => onClubSelect(club)} onVisitToggle={() => onVisitToggle(club.id)} compact />)}
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-3 mt-2">
          {trending.slice(0, 5).map(club => <ClubCard key={club.id} club={club} onClick={() => onClubSelect(club)} onVisitToggle={() => onVisitToggle(club.id)} compact />)}
        </TabsContent>
      </Tabs>
    </div>;
};
export default DiscoverList;