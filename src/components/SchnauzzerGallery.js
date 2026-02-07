import React, { useState } from 'react';

const SchnauzzerGallery = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);

  // Schnauzer gallery with fun facts
  const images = [
    {
      title: 'Classic Schnauzer Portrait',
      fact: 'Schnauzers originated in Germany and were bred to be versatile farm dogs, excelling at catching rats and guarding property.',
      image: '/images/schnauzers/schnauzer-1.jpg'
    },
    {
      title: 'Playful Schnauzer',
      fact: 'The name "Schnauzer" comes from the German word for "snout" or "muzzle," referring to their distinctive bearded face.',
      image: '/images/schnauzers/schnauzer-2.jpg'
    },
    {
      title: 'Alert Watchdog',
      fact: 'Schnauzers come in three sizes: Miniature, Standard, and Giant. Despite size differences, they all share the same spirited personality.',
      image: '/images/schnauzers/schnauzer-3.jpg'
    },
    {
      title: 'Loyal Companion',
      fact: 'Schnauzers are known for being incredibly loyal and form strong bonds with their families, often choosing a favorite person.',
      image: '/images/schnauzers/schnauzer-4.jpg'
    },
    {
      title: 'Intelligent Friend',
      fact: 'These dogs are highly intelligent and trainable, ranking among the top breeds for obedience and working intelligence.',
      image: '/images/schnauzers/schnauzer-5.jpg'
    },
    {
      title: 'Distinguished Gentleman',
      fact: 'With proper grooming, a Schnauzer\'s coat is hypoallergenic and doesn\'t shed much, making them excellent companions for people with allergies.',
      image: '/images/schnauzers/schnauzer-6.jpg'
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
    <div className="min-h-screen p-6 sm:p-12 bg-gradient-to-br from-warm-cream via-warm-cream-light to-warm-cream-dark">
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
        <div className="card-elegant mb-8 bg-gradient-to-br from-white to-slate-50 shadow-2xl transition-all duration-300">
          {/* Schnauzer Photo */}
          <div className="relative w-full aspect-[4/3] rounded-xl mb-6 overflow-hidden bg-slate-grey-light/20">
            <img
              src={currentImage.image}
              alt={currentImage.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-spa-teal-light to-spa-teal flex items-center justify-center" style={{ display: 'none' }}>
              <div className="text-center p-8">
                <svg
                  className="w-32 h-32 mx-auto mb-4 text-white/90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <p className="text-xl sm:text-2xl text-white">
                  Add image: {currentImage.image}
                </p>
              </div>
            </div>
          </div>

          {/* Image Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal">
              {currentImage.title}
            </h2>
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
