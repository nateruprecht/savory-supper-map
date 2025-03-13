
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginLink: React.FC = () => {
  const navigate = useNavigate();
  
  const goToLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          onClick={goToLogin}
          className="text-primary font-medium hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default LoginLink;
