
import React from 'react';
import Layout from '@/components/Layout';
import MapView from '@/components/MapView';
import { sampleSupperClubs } from '@/lib/data';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const Map = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/discover');
  };

  const handleClubSelect = (club) => {
    navigate(`/club/${club.id}`);
    toast.success(`Viewing ${club.name}`, {
      description: "Loading club details...",
    });
  };

  return (
    <Layout activeTab="discover">
      <div className="min-h-screen bg-background pt-16 pb-16 py-0">
        <div className="container mx-auto py-[24px] px-[16px]">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBackClick} className="p-2 h-auto" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-center">Interactive Map</h1>
            <div className="w-10"></div> {/* Empty space for balance */}
          </div>

          <div className="mb-6">
            <Card className="bg-supper-cream/10 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-center mb-2">Discover Supper Clubs Near You</h2>
              <p className="text-center text-muted-foreground mb-4">
                Explore the rich culinary traditions of the Midwest through our interactive map. 
                Find hidden gems and plan your next visit.
              </p>
            </Card>
          </div>

          {/* Using the MapView component */}
          <div className="h-[600px] mb-6 rounded-xl overflow-hidden shadow-md">
            <MapView 
              clubs={sampleSupperClubs} 
              onClubSelect={handleClubSelect}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
