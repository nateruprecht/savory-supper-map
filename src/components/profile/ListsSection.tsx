
import React, { useState } from 'react';
import { List, Plus, Map } from 'lucide-react';
import { UserProfile, SupperClub } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ListsArray = Array<{
  id: string;
  name: string;
  clubs: string[];
}>;

// Mock lists data
const mockLists: ListsArray = [
  {
    id: "list-1",
    name: "Summer Road Trip",
    clubs: ["club-1", "club-3", "club-5"]
  },
  {
    id: "list-2",
    name: "Must Visit",
    clubs: ["club-2", "club-4", "club-7"]
  }
];

type ListsSectionProps = {
  user: UserProfile;
  clubs: SupperClub[];
  compact?: boolean;
};

const ListsSection: React.FC<ListsSectionProps> = ({ user, clubs, compact }) => {
  const [lists] = useState<ListsArray>(mockLists);
  const [activeList, setActiveList] = useState<string | null>(lists.length > 0 ? lists[0].id : null);

  const getClubsForList = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (!list) return [];
    
    return list.clubs.map(clubId => 
      clubs.find(club => club.id === clubId)
    ).filter(Boolean) as SupperClub[];
  };

  const activeListClubs = activeList ? getClubsForList(activeList) : [];

  return (
    <div className={cn("bg-white rounded-xl shadow-sm", compact ? "p-3" : "p-4 sm:p-5")}>
      <h2 className={cn("font-semibold flex items-center", compact ? "text-base mb-2" : "text-lg sm:text-xl mb-3 sm:mb-4")}>
        <List className="h-5 w-5 mr-2 text-primary" />
        Your Lists
      </h2>
      
      {lists.length > 0 ? (
        <>
          <div className="flex overflow-x-auto pb-2 mb-4 -mx-1 px-1">
            {lists.map(list => (
              <button
                key={list.id}
                onClick={() => setActiveList(list.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap mr-2 transition-colors",
                  activeList === list.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {list.name} ({list.clubs.length})
              </button>
            ))}
            
            <button
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-3 w-3 mr-1" />
              New List
            </button>
          </div>
          
          {activeListClubs.length > 0 ? (
            <div className="space-y-2">
              {activeListClubs.map(club => (
                <div key={club.id} className="flex items-center p-2 rounded-lg border">
                  <div className="w-10 h-10 rounded overflow-hidden mr-3">
                    <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{club.name}</div>
                    <div className="text-xs text-muted-foreground">{club.city}, {club.state}</div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center mt-2">
                <Map className="h-4 w-4 mr-2" />
                View on Map
              </Button>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No clubs in this list yet
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6">
          <List className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-4">You haven't created any lists yet.</p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First List
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListsSection;
