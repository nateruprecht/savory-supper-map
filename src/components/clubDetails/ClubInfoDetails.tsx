
import React from 'react';
import { Clock, Phone, MapPin, Globe, Star } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import StarRating from './StarRating';

type ClubInfoDetailsProps = {
  club: SupperClub;
};

const ClubInfoDetails: React.FC<ClubInfoDetailsProps> = ({ club }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-1">{club.name}</h2>
      
      <div className="flex items-center mb-3">
        <div className="flex items-center mr-3">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
          <span className="font-medium">{club.rating}</span>
          <span className="text-xs text-muted-foreground ml-1">
            ({club.reviews.length} reviews)
          </span>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span>
            {club.city}, {club.state}
          </span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">
        {club.description}
      </p>
      
      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 text-muted-foreground mr-2" />
          <div>
            <span className="text-muted-foreground">Open Hours:</span>
            <div>{club.openHours}</div>
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 text-muted-foreground mr-2" />
          <div>
            <span className="text-muted-foreground">Phone:</span>
            <div>{club.phoneNumber}</div>
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
          <div>
            <span className="text-muted-foreground">Address:</span>
            <div>{club.address}, {club.city}, {club.state}</div>
          </div>
        </div>
        
        {club.website && (
          <div className="flex items-center text-sm">
            <Globe className="h-4 w-4 text-muted-foreground mr-2" />
            <div>
              <span className="text-muted-foreground">Website:</span>
              <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block">
                {club.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClubInfoDetails;
