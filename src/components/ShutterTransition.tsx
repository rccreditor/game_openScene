import { useState, useEffect } from 'react';

interface ShutterTransitionProps {
  onComplete?: () => void;
}

export const ShutterTransition = ({ onComplete }: ShutterTransitionProps) => {
  const [animationStage, setAnimationStage] = useState<'start' | 'closing' | 'closed' | 'message'>('start');

  useEffect(() => {
    // Smoothen the sequence and hold fully-covered screen longer
    const timer1 = setTimeout(() => setAnimationStage('closing'), 80);
    const timer2 = setTimeout(() => setAnimationStage('closed'), 920);
    const timer3 = setTimeout(() => setAnimationStage('message'), 1300);
    // Keep message/covered state slightly longer so navigation feels seamless
    const timer4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Top Shutter */}
      <div 
        className={`absolute top-0 left-0 w-full bg-army-green-dark border-b-4 border-gold-accent transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          animationStage === 'start' ? 'h-0' : 
          animationStage === 'closing' ? 'h-1/2' : 'h-1/2'
        }`}
        style={{
          background: 'linear-gradient(180deg, hsl(var(--army-green-dark)) 0%, hsl(var(--background)) 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        {/* Military Pattern on Top Shutter */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `
                 linear-gradient(45deg, transparent 25%, hsl(var(--gold-accent)) 25%, hsl(var(--gold-accent)) 50%, transparent 50%, transparent 75%, hsl(var(--gold-accent)) 75%),
                 linear-gradient(-45deg, transparent 25%, hsl(var(--gold-accent)) 25%, hsl(var(--gold-accent)) 50%, transparent 50%, transparent 75%, hsl(var(--gold-accent)) 75%)
               `,
               backgroundSize: '20px 20px'
             }}
        />
      </div>

      {/* Bottom Shutter */}
      <div 
        className={`absolute bottom-0 left-0 w-full bg-army-green-dark border-t-4 border-gold-accent transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          animationStage === 'start' ? 'h-0' : 
          animationStage === 'closing' ? 'h-1/2' : 'h-1/2'
        }`}
        style={{
          background: 'linear-gradient(0deg, hsl(var(--army-green-dark)) 0%, hsl(var(--background)) 100%)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
        }}
      >
        {/* Military Pattern on Bottom Shutter */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `
                 linear-gradient(45deg, transparent 25%, hsl(var(--gold-accent)) 25%, hsl(var(--gold-accent)) 50%, transparent 50%, transparent 75%, hsl(var(--gold-accent)) 75%),
                 linear-gradient(-45deg, transparent 25%, hsl(var(--gold-accent)) 25%, hsl(var(--gold-accent)) 50%, transparent 50%, transparent 75%, hsl(var(--gold-accent)) 75%)
               `,
               backgroundSize: '20px 20px'
             }}
        />
      </div>

      {/* JAI HIND Message */}
      {animationStage === 'message' && (
        <div className="absolute inset-0 flex items-center justify-center will-change-transform will-change-opacity">
          <div className="text-center space-y-16 animate-scale-in max-w-4xl px-8 transition-opacity duration-500 ease-out">
            {/* Good Luck Player Text */}
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-light text-gold-accent tracking-[0.3em] animate-fade-in" 
                  style={{ 
                    textShadow: '0 4px 12px hsl(var(--army-green-dark) / 0.8)',
                    fontFamily: 'var(--font-military)',
                    letterSpacing: '0.3em'
                  }}>
                GOOD LUCK PLAYER
              </h2>
              
              {/* Elegant underline */}
              <div className="mt-4 flex justify-center">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-accent to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Professional Separator */}
            <div className="flex items-center justify-center space-x-6 py-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-accent/40"></div>
              <div className="flex space-x-3">
                <div className="w-2 h-2 bg-gold-accent/60 rounded-full"></div>
                <div className="w-3 h-3 bg-gold-accent rounded-full"></div>
                <div className="w-2 h-2 bg-gold-accent/60 rounded-full"></div>
              </div>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-accent/40"></div>
            </div>

            {/* JAI HIND Text */}
            <div className="relative pt-8">
              <h1 className="text-6xl md:text-8xl font-bold text-green-400 tracking-[0.2em] animate-fade-in" 
                  style={{ 
                    textShadow: '0 6px 20px rgba(0, 0, 0, 0.8), 0 2px 4px hsl(var(--army-green-dark))',
                    fontFamily: 'var(--font-military)',
                    letterSpacing: '0.2em'
                  }}>
                JAI HIND
              </h1>
              
              {/* Refined accent marks */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-1 h-8 bg-green-400/40 transform rotate-12"></div>
                <div className="w-1 h-10 bg-green-400/60"></div>
                <div className="w-1 h-8 bg-green-400/40 transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metal bolts/rivets effect on shutters */}
      {(animationStage === 'closed' || animationStage === 'message') && (
        <>
          {/* Top shutter bolts */}
          <div className="absolute top-1/2 left-0 w-full flex justify-around items-center -translate-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-steel-gray rounded-full border-2 border-gold-accent/50 shadow-lg" />
            ))}
          </div>
          
          {/* Bottom shutter bolts */}
          <div className="absolute top-1/2 left-0 w-full flex justify-around items-center translate-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-steel-gray rounded-full border-2 border-gold-accent/50 shadow-lg" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};