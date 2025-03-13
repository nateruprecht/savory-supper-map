
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Globe, ClipboardList, BarChart } from 'lucide-react';

const WelcomeScreens = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();
  
  const screens = [
    {
      id: 1,
      title: "Welcome to Midwest Supper Roadmap",
      subtitle: "Discover classic supper clubs in the Midwest. Join us on a culinary journey through regional tradition.",
      image: "/lovable-uploads/d6c96a5d-2559-4a9c-b644-2d5f00055c36.png",
      buttonText: "Start Your Journey",
      icon: null
    },
    {
      id: 2,
      title: "Midwest Supper Roadmap",
      subtitle: "Discover Supper Clubs",
      description: "Find and enjoy the best supper clubs in the midwest!",
      buttonText: "Continue",
      icon: <Globe className="h-12 w-12 text-supper-amber" />
    },
    {
      id: 3,
      title: "Midwest Supper Roadmap",
      subtitle: "Review and Track Your Visits",
      description: "Check achievements as you explore the best supper clubs in the midwest!",
      buttonText: "Continue",
      icon: <ClipboardList className="h-12 w-12 text-supper-red" />
    },
    {
      id: 4,
      title: "Midwest Supper Roadmap",
      subtitle: "Supper Club Status",
      description: "Watch the top of the leaderboards and share your status in the supper club community!",
      buttonText: "Explore",
      icon: <BarChart className="h-12 w-12 text-supper-gold" />
    }
  ];

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigate('/signup');
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkip = () => {
    navigate('/signup');
  };

  const currentScreenData = screens[currentScreen];

  // First screen has a special layout
  if (currentScreen === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col h-screen relative overflow-hidden"
      >
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${currentScreenData.image})` }}
        >
          <div className="absolute inset-0 bg-black/50">
            <div className="flex flex-col justify-end h-full p-8 pb-16 text-center text-white">
              <h1 className="text-3xl font-bold mb-3">{currentScreenData.title}</h1>
              <p className="text-lg mb-8">{currentScreenData.subtitle}</p>
              <div className="flex justify-center">
                <Button 
                  onClick={nextScreen}
                  size="lg"
                  className="bg-supper-red hover:bg-supper-red/90 font-semibold px-6"
                >
                  {currentScreenData.buttonText}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <button 
                onClick={handleSkip}
                className="mt-6 text-white/80 hover:text-white text-sm underline"
              >
                Skip Introduction
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {screens.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full ${idx === currentScreen ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-background"
    >
      {currentScreen > 0 && (
        <button 
          onClick={prevScreen}
          className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-supper-navy" />
        </button>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto">
        <div className="w-full text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
              {currentScreenData.icon}
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1 text-supper-navy">{currentScreenData.title}</h1>
          <h2 className="text-xl font-semibold mb-3 text-supper-brown">{currentScreenData.subtitle}</h2>
          <p className="text-muted-foreground">{currentScreenData.description}</p>
        </div>

        <div className="flex justify-center my-8">
          {currentScreen === 1 && (
            <img 
              src="/placeholder.svg" 
              alt="Map" 
              className="h-48 w-48 object-contain"
            />
          )}
          {currentScreen === 2 && (
            <img 
              src="/placeholder.svg" 
              alt="Journey" 
              className="h-48 w-48 object-contain" 
            />
          )}
          {currentScreen === 3 && (
            <img 
              src="/placeholder.svg" 
              alt="Community" 
              className="h-48 w-48 object-contain"
            />
          )}
        </div>

        <div className="w-full flex justify-center">
          <Button 
            onClick={nextScreen}
            size="lg"
            className="bg-supper-navy hover:bg-supper-navy/90 font-semibold px-6 min-w-[160px]"
          >
            {currentScreenData.buttonText}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="pb-10 flex justify-center">
        <div className="flex space-x-2">
          {screens.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full ${idx === currentScreen ? 'bg-supper-red' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreens;
