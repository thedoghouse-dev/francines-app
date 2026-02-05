// 30-day rotating word list for Francine's Daily Focus
export const DAILY_WORDS = [
  { word: 'SCHNAUZER', description: 'A loyal and intelligent companion' },
  { word: 'BARK', description: 'The voice of a happy dog' },
  { word: 'LOYAL', description: 'Always by your side' },
  { word: 'FRIEND', description: 'A bond that never breaks' },
  { word: 'PLAY', description: 'Joy in every moment' },
  { word: 'WALK', description: 'Adventures together' },
  { word: 'CARE', description: 'Love shown through action' },
  { word: 'TRUST', description: 'The foundation of friendship' },
  { word: 'HOME', description: 'Where the heart is' },
  { word: 'HAPPY', description: 'The best kind of day' },
  { word: 'GENTLE', description: 'Kindness in touch' },
  { word: 'SMART', description: 'Quick to learn and understand' },
  { word: 'BRAVE', description: 'Courage in small packages' },
  { word: 'COMFORT', description: 'Peace and contentment' },
  { word: 'FAMILY', description: 'Those we hold dear' },
  { word: 'CALM', description: 'Serenity and peace' },
  { word: 'GRACE', description: 'Elegance in movement' },
  { word: 'WISDOM', description: 'Knowledge gained with time' },
  { word: 'PATIENT', description: 'Good things come to those who wait' },
  { word: 'KIND', description: 'Gentle words and actions' },
  { word: 'PEACEFUL', description: 'A tranquil state of mind' },
  { word: 'JOYFUL', description: 'Happiness that radiates' },
  { word: 'PROTECT', description: 'Keeping loved ones safe' },
  { word: 'FETCH', description: 'A game of give and take' },
  { word: 'CUDDLE', description: 'Warmth and affection' },
  { word: 'WATCHFUL', description: 'Always alert and aware' },
  { word: 'DEVOTED', description: 'Unwavering commitment' },
  { word: 'NOBLE', description: 'Dignified and distinguished' },
  { word: 'RESPECT', description: 'Honor and admiration' },
  { word: 'COMPANION', description: 'A constant presence' },
];

// Get today's word based on day of month (cycles every 30 days)
export const getTodayWord = () => {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const index = (dayOfMonth - 1) % DAILY_WORDS.length;
  return DAILY_WORDS[index];
};

// Format date for display
export const getFormattedDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};
