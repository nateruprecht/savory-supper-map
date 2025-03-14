
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type AddClubFormProps = {
  onClose: () => void;
};

const AddClubForm: React.FC<AddClubFormProps> = ({ onClose }) => {
  const [clubName, setClubName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would save the club to the database
    // and automatically mark it as visited
    toast.success(`Club "${clubName}" added and marked as visited!`);
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="club-name" className="block text-sm font-medium mb-1">Club Name</label>
        <Input
          id="club-name"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          placeholder="Enter club name"
          required
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter street address"
          required
        />
      </div>
      
      <div>
        <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
        <Input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
        />
      </div>
      
      <div>
        <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
        <Input
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
          required
        />
      </div>
      
      <div>
        <label htmlFor="zip-code" className="block text-sm font-medium mb-1">Zip Code</label>
        <Input
          id="zip-code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter zip code"
          required
        />
      </div>
      
      <div className="pt-2">
        <Button type="submit" className="w-full">Add Club and Mark as Visited</Button>
      </div>
    </form>
  );
};

export default AddClubForm;
