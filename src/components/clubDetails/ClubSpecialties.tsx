
import React from 'react';

type ClubSpecialtiesProps = {
  specialties: string[];
};

const ClubSpecialties: React.FC<ClubSpecialtiesProps> = ({ specialties }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Specialties</h3>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <span key={specialty} className="badge bg-secondary text-secondary-foreground">
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ClubSpecialties;
