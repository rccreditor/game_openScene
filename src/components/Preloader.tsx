import { useState, useEffect } from 'react';
import ashokaChakra from '@/assets/ashoka-chakra.png';
import emblem from '@/assets/emblem.png';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const welcomeTexts = [
    "INITIALIZING SYSTEM...",
    "LOADING SECURITY PROTOCOLS...", 
    "WELCOME TO THE ARMY",
    "MISSION BRIEFING READY"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % welcomeTexts.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete, welcomeTexts.length]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-army-green-dark to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--army-green))_0%,transparent_70%)] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 w-full max-w-md px-8">
        {/* Army Logo/Emblem */}
        <div className="mx-auto w-40 h-40 bg-gradient-command rounded-full flex items-center justify-center border-4 border-army-green-light/30 shadow-command animate-pulse p-3">
          <img 
            src={emblem} 
            alt="Emblem" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-gold-accent text-3xl font-bold tracking-wider animate-fade-in">
            INDIAN ARMY
          </h1>
          
          <div className="h-8 flex items-center justify-center">
            <p className="text-foreground text-lg font-medium tracking-wide transition-all duration-300 animate-fade-in">
              {welcomeTexts[textIndex]}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-army-green-dark/30 rounded-full h-2 border border-army-green-light/20">
            <div 
              className="bg-gradient-to-r from-army-green to-gold-accent h-full rounded-full transition-all duration-300 shadow-[0_0_10px_hsl(var(--army-green))]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 text-desert-tan text-sm">
          <div className="w-2 h-2 bg-army-green rounded-full animate-pulse" />
          <span>SECURE CONNECTION ESTABLISHED</span>
        </div>
      </div>

      {/* Military Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(hsl(var(--army-green-light)) 1px, transparent 1px),
                 linear-gradient(90deg, hsl(var(--army-green-light)) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }}
        />
      </div>
    </div>
  );
};