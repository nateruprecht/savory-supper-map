
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { toast } from 'sonner';

type AddVisitButtonProps = {
  clubs: SupperClub[];
};

const AddVisitButton: React.FC<AddVisitButtonProps> = ({ clubs }) => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  
  const handleAddVisitClick = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
  };
  
  return (
    <div className="fixed bottom-20 right-6 z-40 md:bottom-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-supper-red text-white shadow-lg flex items-center justify-center"
        onClick={handleAddVisitClick}
        aria-label="Add a visit"
      >
        <Plus className="h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {isAddMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute bottom-16 right-0 w-64 bg-white rounded-lg shadow-lg p-4"
          >
            <h3 className="font-medium mb-3">Add a Supper Club Visit</h3>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search for a supper club..."
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {clubs.slice(0, 3).map(club => (
                <button
                  key={club.id}
                  className="flex items-center w-full p-2 hover:bg-gray-50 rounded-md mb-1 text-left"
                  onClick={() => {
                    toast.success(`Added visit to ${club.name}`);
                    setIsAddMenuOpen(false);
                  }}
                >
                  <div className="w-10 h-10 rounded overflow-hidden mr-3">
                    <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{club.name}</div>
                    <div className="text-xs text-muted-foreground">{club.city}, {club.state}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddVisitButton;
