import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Preloader } from './Preloader';
import { ShutterTransition } from './ShutterTransition';
import basecampBg from '@/assets/army-basecamp-bg.jpg';
import majorGeneral from '@/assets/major-general.png';

const briefingParagraphs = [
  "Welcome, Protector. You are entering a secure training environment inspired by the Indian Army. Your objective is to learn the essentials that will keep families financially safe—calm mind, steady aim.",
  "In this operation, we move in short missions. Each action you take mirrors a skill from the field: observation, clarity, and timely decision-making. Keep your focus on the objective.",
  "You will face targets that unlock questions. Read carefully, choose with intent. A correct call advances the mission; a wrong call costs you ground. Remember—discipline first, then speed.",
  "This briefing completes your orientation. Maintain integrity, follow protocol, and proceed when ready. On my mark, you will begin Mission 1: Intel—identify, learn, and neutralize doubt. Jai Hind!"
];

export const BriefingScene = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showShutter, setShowShutter] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [characterVisible, setCharacterVisible] = useState(false);

  useEffect(() => {
    // Animate character appearance
    const timer = setTimeout(() => setCharacterVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentParagraph < briefingParagraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    }
  };

  const handlePrevious = () => {
    if (currentParagraph > 0) {
      setCurrentParagraph(currentParagraph - 1);
    }
  };

  const handleStartMission = () => {
    setShowShutter(true);
  };

  const handleShutterComplete = () => {
    // This would trigger the next scene/mission
    console.log("Mission starting...");
  };


  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <>
      {showShutter && <ShutterTransition onComplete={handleShutterComplete} />}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${basecampBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" />
        </div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40" />


        {/* Major General Character with Speech Bubble */}
        <div className="absolute left-8 bottom-0 z-10">
          <div className={`transition-all duration-1000 ${characterVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              {/* Character Image */}
              <img 
                src={majorGeneral} 
                alt="Major General" 
                className="h-[500px] w-auto drop-shadow-2xl"
              />
              
              {/* Speech Bubble */}
              <div className="absolute top-8 left-full ml-8 w-[600px]">
                <div className="relative bg-army-green-dark/95 border border-army-green-light/30 rounded-xl p-6 backdrop-blur-sm shadow-tactical">
                  {/* Speech bubble pointer */}
                  <div className="absolute left-0 top-8 w-0 h-0 border-l-0 border-r-[20px] border-t-[10px] border-b-[10px] border-r-army-green-dark/95 border-t-transparent border-b-transparent -translate-x-[20px]"></div>
                  <div className="absolute left-0 top-8 w-0 h-0 border-l-0 border-r-[18px] border-t-[9px] border-b-[9px] border-r-army-green-light/30 border-t-transparent border-b-transparent -translate-x-[18px]"></div>
                  
                  {/* Rank and Title */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-6 bg-gradient-command rounded-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-background">★★</span>
                    </div>
                    <div>
                      <h1 className="text-gold-accent font-bold text-sm">Major General</h1>
                      <p className="text-desert-tan text-sm">Intelligence Briefing</p>
                    </div>
                  </div>

                  {/* Current Dialogue */}
                  <div className="bg-background/10 rounded-lg p-4 border border-army-green-light/20 mb-4">
                    <p className="text-foreground text-lg leading-relaxed">
                      {briefingParagraphs[currentParagraph]}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex space-x-1 mb-4">
                    {briefingParagraphs.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          index <= currentParagraph ? 'bg-gold-accent' : 'bg-army-green/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between space-x-2">
                    {/* Previous Button */}
                    <div>
                      {currentParagraph > 0 && (
                        <Button
                          onClick={handlePrevious}
                          size="lg"
                          variant="secondary"
                          className="bg-steel-gray hover:bg-steel-gray/80 text-foreground font-semibold px-6 text-xl"
                        >
                          Previous
                        </Button>
                      )}
                    </div>

                    {/* Next/Start Mission Button */}
                    <div className="flex space-x-2">
                      {currentParagraph < briefingParagraphs.length - 1 ? (
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="bg-army-green hover:bg-army-green-light text-foreground font-semibold px-4 shadow-command text-lg"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          onClick={handleStartMission}
                          size="lg"
                          className="bg-command-red hover:bg-command-red/80 text-foreground font-bold px-8 shadow-command animate-pulse text-2xl"
                        >
                          Start Mission
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Title Overlay */}
        <div className="absolute top-8 left-8 z-20">
          <div className="bg-army-green-dark/90 border border-army-green-light/30 rounded-lg p-4 backdrop-blur-sm">
            <h1 className="text-gold-accent font-bold text-xl"> INTEL BRIEFING</h1>
            <p className="text-desert-tan text-sm">Classification: BRIEFING</p>
          </div>
        </div>
      </div>
    </>
  );
};