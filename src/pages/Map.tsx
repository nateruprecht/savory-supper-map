import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { sampleSupperClubs } from '@/lib/data';
import { SupperClub } from '@/lib/types';
import { MapPin, ChevronRight, Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
const Map = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Midwest states with club counts (in real app, this would come from backend)
  const states = [{
    id: 'Wisconsin',
    count: 65
  }, {
    id: 'Minnesota',
    count: 42
  }, {
    id: 'Michigan',
    count: 38
  }, {
    id: 'Illinois',
    count: 27
  }, {
    id: 'Iowa',
    count: 18
  }];

  // Filter clubs based on selected state and search query
  const filteredClubs = sampleSupperClubs.filter(club => {
    if (selectedState && club.state !== selectedState) return false;
    if (searchQuery && !club.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  const handleStateClick = (stateId: string) => {
    setSelectedState(prevState => prevState === stateId ? null : stateId);
  };
  const handleClubClick = (club: SupperClub) => {
    setSelectedClub(club);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleBackClick = () => {
    navigate('/discover');
  };
  return <Layout activeTab="discover">
      <div className="min-h-screen bg-background pt-16 pb-16 py-[4px]">
        <div className="container mx-auto py-[24px] px-[16px]">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBackClick} className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Discover
            </Button>
            <h1 className="text-2xl font-bold text-center">Interactive Map</h1>
            <div className="w-24"></div> {/* Empty space for balance */}
          </div>

          <div className="mb-6">
            <Card className="bg-supper-cream/10 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-center mb-2">Discover Supper Clubs Near You</h2>
              <p className="text-center text-muted-foreground mb-4">
                Explore the rich culinary traditions of the Midwest through our interactive map. 
                Find hidden gems and plan your next visit.
              </p>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for supper clubs..." className="pl-9 bg-white" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar: Midwest Regions */}
            <div className="bg-supper-cream/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Midwest Regions</h3>
              <div className="space-y-2">
                {states.map(state => <motion.div key={state.id} className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border ${selectedState === state.id ? 'bg-supper-amber/20 border-supper-amber' : 'bg-white border-transparent hover:bg-supper-cream/20'}`} onClick={() => handleStateClick(state.id)} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                    <div className="flex items-center">
                      <MapPin className={`h-4 w-4 mr-2 ${selectedState === state.id ? 'text-supper-amber' : 'text-muted-foreground'}`} />
                      <span>{state.id}</span>
                    </div>
                    <span className="text-xs bg-background/80 px-2 py-1 rounded-full">
                      {state.count} clubs
                    </span>
                  </motion.div>)}
              </div>
              <Button variant="link" className="mt-4 text-primary flex items-center justify-center w-full">
                Explore full map <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Right area: Map visualization */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm h-[500px] relative">
              {/* Simplified map visualization */}
              <div className="absolute inset-0 bg-supper-cream/20 flex items-center justify-center">
                <svg viewBox="0 0 400 300" width="100%" height="100%" className="p-8">
                  {/* Wisconsin shape (simplified) */}
                  <path d="M150,50 L200,40 L250,80 L230,150 L180,170 L150,140 L130,80 Z" fill={selectedState === 'Wisconsin' ? '#E9C46A80' : '#E9C46A30'} stroke="#9D4B2E" strokeWidth="3" className="cursor-pointer hover:fill-supper-amber/40" onClick={() => handleStateClick('Wisconsin')} />
                  
                  {/* Club pins for Wisconsin */}
                  {selectedState === 'Wisconsin' && <>
                      <circle cx="180" cy="90" r="6" fill="#9D4B2E" className="cursor-pointer" onClick={() => handleClubClick(sampleSupperClubs[0])} />
                      <circle cx="200" cy="110" r="6" fill="#9D4B2E" className="cursor-pointer" onClick={() => handleClubClick(sampleSupperClubs[1])} />
                      <circle cx="165" cy="130" r="6" fill="#E9C46A" className="cursor-pointer" onClick={() => handleClubClick(sampleSupperClubs[2])} />
                      <circle cx="190" cy="70" r="6" fill="#E9C46A" className="cursor-pointer" onClick={() => handleClubClick(sampleSupperClubs[3])} />
                    </>}
                  
                  {/* Minnesota shape (simplified) */}
                  <path d="M100,50 L150,50 L130,80 L150,140 L100,150 L80,100 Z" fill={selectedState === 'Minnesota' ? '#E9C46A80' : '#E9C46A30'} stroke="#9D4B2E" strokeWidth="3" className="cursor-pointer hover:fill-supper-amber/40" onClick={() => handleStateClick('Minnesota')} />
                  
                  {/* Michigan shape (simplified) */}
                  <path d="M250,80 L300,60 L320,100 L280,130 L230,150 Z" fill={selectedState === 'Michigan' ? '#E9C46A80' : '#E9C46A30'} stroke="#9D4B2E" strokeWidth="3" className="cursor-pointer hover:fill-supper-amber/40" onClick={() => handleStateClick('Michigan')} />
                  
                  {/* Illinois shape (simplified) */}
                  <path d="M180,170 L200,230 L160,230 L150,180 Z" fill={selectedState === 'Illinois' ? '#E9C46A80' : '#E9C46A30'} stroke="#9D4B2E" strokeWidth="3" className="cursor-pointer hover:fill-supper-amber/40" onClick={() => handleStateClick('Illinois')} />
                  
                  {/* Iowa shape (simplified) */}
                  <path d="M100,150 L150,140 L150,180 L120,190 L100,170 Z" fill={selectedState === 'Iowa' ? '#E9C46A80' : '#E9C46A30'} stroke="#9D4B2E" strokeWidth="3" className="cursor-pointer hover:fill-supper-amber/40" onClick={() => handleStateClick('Iowa')} />
                </svg>
              </div>
              
              {/* State info overlay */}
              {selectedState && <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-sm border border-supper-amber/30">
                  <h3 className="font-semibold">{selectedState}</h3>
                  <p className="text-xs text-muted-foreground">
                    {states.find(s => s.id === selectedState)?.count || 0} supper clubs
                  </p>
                </div>}
              
              {/* Selected club info */}
              {selectedClub && <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="absolute bottom-4 right-4 left-4 bg-white p-4 rounded-lg shadow-md border border-supper-amber">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{selectedClub.name}</h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedClub(null)}>
                      ×
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{selectedClub.address}, {selectedClub.city}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs bg-supper-amber/20 px-2 py-1 rounded-full mr-2">
                        {selectedClub.rating.toFixed(1)} ★
                      </span>
                      <span className="text-xs bg-background/80 px-2 py-1 rounded-full">
                        {selectedClub.reviews.length} reviews
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => navigate(`/club/${selectedClub.id}`)}>
                      View Details
                    </Button>
                  </div>
                </motion.div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Map;