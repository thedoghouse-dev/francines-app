import React, { useState } from 'react';

const SchnauzzerGallery = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);

  // Schnauzer gallery with fun facts
  const images = [
    {
      title: 'Classic Schnauzer Portrait',
      fact: 'Schnauzers originated in Germany and were bred to be versatile farm dogs, excelling at catching rats and guarding property.',
      color: 'from-slate-grey-light to-slate-grey'
    },
    {
      title: 'Playful Schnauzer',
      fact: 'The name "Schnauzer" comes from the German word for "snout" or "muzzle," referring to their distinctive bearded face.',
      color: 'from-spa-teal-light to-spa-teal'
    },
    {
      title: 'Alert Watchdog',
      fact: 'Schnauzers come in three sizes: Miniature, Standard, and Giant. Despite size differences, they all share the same spirited personality.',
      color: 'from-gold-leaf-light to-gold-leaf'
    },
    {
      title: 'Loyal Companion',
      fact: 'Schnauzers are known for being incredibly loyal and form strong bonds with their families, often choosing a favorite person.',
      color: 'from-slate-grey to-spa-teal-dark'
    },
    {
      title: 'Intelligent Friend',
      fact: 'These dogs are highly intelligent and trainable, ranking among the top breeds for obedience and working intelligence.',
      color: 'from-spa-teal to-charcoal'
    },
    {
      title: 'Distinguished Gentleman',
      fact: 'With proper grooming, a Schnauzer\'s coat is hypoallergenic and doesn\'t shed much, making them excellent companions for people with allergies.',
      color: 'from-warm-cream-dark to-slate-grey'
    },
  ];

  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    setShowFact(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setShowFact(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen p-6 sm:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-spa-teal-dark">
          Schnauzer Gallery
        </h1>
        <button onClick={onExit} className="btn-secondary">
          HOME
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Image Display Area */}
        <div className="card-elegant mb-8">
          {/* Placeholder Image - Using gradient backgrounds with elegant line art concept */}
          <div className={`
            w-full aspect-[4/3] rounded-xl mb-6
            bg-gradient-to-br ${currentImage.color}
            flex items-center justify-center
            border-4 border-slate-grey-light/30
          `}>
            <div className="text-center p-8">
              {/* Dog icon SVG */}
              <svg
                className="w-48 h-48 mx-auto mb-6 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <p className="text-3xl sm:text-4xl font-semibold text-white">
                {currentImage.title}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="text-center mb-4">
            <p className="text-2xl sm:text-3xl text-slate-grey font-medium">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <button
            onClick={handlePrevious}
            className="btn-primary flex items-center justify-center gap-3"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span>PREVIOUS</span>
          </button>
          <button
            onClick={handleNext}
            className="btn-primary flex items-center justify-center gap-3"
          >
            <span>NEXT</span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Fun Fact Section */}
        <div className="card-elegant">
          {!showFact ? (
            <button
              onClick={() => setShowFact(true)}
              className="w-full bg-gold-leaf/20 hover:bg-gold-leaf/40
                         text-charcoal-dark font-bold py-8 px-6 rounded-xl
                         transition-all duration-300 active:scale-98
                         border-2 border-gold-leaf"
            >
              <p className="text-3xl sm:text-4xl">
                REVEAL FUN FACT
              </p>
            </button>
          ) : (
            <div className="bg-spa-teal/10 p-8 rounded-xl border-2 border-spa-teal">
              <div className="flex items-start gap-4 mb-4">
                <svg className="w-12 h-12 text-spa-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-2xl sm:text-3xl text-charcoal leading-relaxed">
                  {currentImage.fact}
                </p>
              </div>
              <button
                onClick={() => setShowFact(false)}
                className="btn-secondary w-full mt-4"
              >
                HIDE FACT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchnauzzerGallery;
