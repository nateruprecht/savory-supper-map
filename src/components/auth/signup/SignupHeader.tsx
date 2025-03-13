
import React from 'react';

interface SignupHeaderProps {
  step: number;
}

const SignupHeader: React.FC<SignupHeaderProps> = ({ step }) => {
  return (
    <>
      <div className="flex justify-center mb-6 mt-6">
        <div className="w-16 h-16 rounded-full bg-supper-cream flex items-center justify-center shadow-md">
          <img 
            src="/placeholder.svg" 
            alt="Supper Club Logo" 
            className="h-10 w-10" 
          />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Join SupperClubs</h1>
      <p className="text-center text-muted-foreground mb-6">
        Create an account to discover the best supper clubs
      </p>

      <div className="mb-6 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-supper-red' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-supper-red' : 'bg-gray-300'}`}></div>
        </div>
      </div>
    </>
  );
};

export default SignupHeader;
