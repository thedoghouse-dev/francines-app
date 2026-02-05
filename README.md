# Francine's Premium Digital Activity Suite

A sophisticated, accessible web application designed specifically for seniors, featuring elegant word puzzles, memory games, and an educational Schnauzer gallery.

## Design Philosophy

- **Premium & Dignified**: Spa-like aesthetic with sophisticated color palette (deep teals, soft grays, warm creams)
- **Senior-Friendly**: Large text, click-based interactions (no dragging), high contrast for readability
- **Elegant Typography**: Clean sans-serif fonts (Inter) with generous sizing
- **Accessible Controls**: Large touch targets, clear labeling, intuitive navigation

## Features

### Dashboard
- Personalized greeting with current date
- Daily rotating word with meaningful descriptions (30-day cycle)
- Three activity cards with clear entry points

### Word Search
- 8x8 grid with large, clear letters
- Click-to-select mechanic (click first letter, then last letter)
- Horizontal and vertical words only
- Soft highlight effect for found words
- Automatic puzzle generation

### Schnauzer Gallery
- Six curated images with elegant gradient backgrounds
- Large PREVIOUS/NEXT navigation buttons
- Fun facts reveal system
- Educational content about Schnauzers

### Memory Match
- Six cards (three pairs) for gentle cognitive challenge
- Elegant line art icons
- Move counter
- Victory celebration

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Creates optimized production build in `/build` folder.

## Technology Stack

- **React 18** - Modern component-based architecture
- **Tailwind CSS 3** - Utility-first styling with custom design system
- **Inter Font** - Professional, readable typography

## Color Palette

- **Spa Teal**: Primary action color (#2C6B6B)
- **Slate Grey**: Secondary elements (#6B7280)
- **Warm Cream**: Background (#F5F1E8)
- **Charcoal**: Text (#2D3748)
- **Gold Leaf**: Highlights & achievements (#C5A028)

## Browser Support

Optimized for modern browsers and tablets:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

## Customization

To modify the daily word list, edit `src/wordList.js`.

To adjust colors, update `tailwind.config.js`.

---

Built with care for Francine ❤️
