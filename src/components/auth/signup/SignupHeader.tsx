
import React from 'react';

interface SignupHeaderProps {
  step: number;
}

const SignupHeader: React.FC<SignupHeaderProps> = ({ step }) => {
  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-supper-cream flex items-center justify-center shadow-md border-2 border-supper-red/20">
          <img 
            src="/placeholder.svg" 
            alt="Supper Club Logo" 
            className="h-12 w-12" 
          />
        </div>
      </div>
      
      <h1 className="text-3xl font-display font-bold text-center mb-2 text-supper-red">Join SupperClubs</h1>
      <p className="text-center text-muted-foreground mb-6 font-medium">
        Create an account to discover the best supper clubs
      </p>

      <div className="mb-6 flex justify-center">
        <div className="w-24 h-1.5 bg-gray-200 rounded-full relative">
          <div 
            className={`absolute left-0 top-0 h-full bg-supper-red rounded-full transition-all duration-300 ease-in-out ${
              step === 1 ? 'w-1/2' : 'w-full'
            }`}
          ></div>
          <div className="absolute left-0 top-0 flex w-full justify-between -mt-2">
            <div className={`w-4 h-4 rounded-full ${step >= 1 ? 'bg-supper-red' : 'bg-gray-300'} transform -translate-x-1/2`}></div>
            <div className={`w-4 h-4 rounded-full ${step >= 2 ? 'bg-supper-red' : 'bg-gray-300'} transform translate-x-1/2`}></div>
          </div>
        </div>
      </div>
      
      <div className="retro-divider mb-6"></div>
    </>
  );
};

export default SignupHeader;
