# Pink Floyd Fanbase Website

A fully responsive, single-page Pink Floyd fanbase website with a dark, psychedelic aesthetic inspired by "The Dark Side of the Moon."

## Features

- **Dark, Cosmic Theme**: Prism-inspired color scheme with smooth gradients
- **Prism Light Dispersion Background**: Atmospheric overlay effect
- **Auto-playing Audio**: "Comfortably Numb" plays automatically on load
- **Interactive Song Cards**: Pink Floyd discography with hover effects
- **Music Taste Section**: Showcasing favorite bands
- **Social Media Links**: Clean, minimal social handles section
- **Smooth Animations**: Parallax scrolling, glow effects, and ambient motion
- **Fully Responsive**: Works on mobile, tablet, and desktop

## Required Files

To complete the setup, you need to add the following files to the project root:

1. **`prism-light.png`** - An image of light dispersion through a prism (slightly transparent overlay)
   - Recommended: 1920x1080 or larger
   - Should be a PNG with transparency or low opacity
   - Place in the root directory

2. **`pink-floyd-logo.png`** - Pink Floyd logo image
   - Recommended: PNG with transparency
   - Will be displayed as a low-opacity background element
   - Place in the root directory

3. **`comfortably-numb.mp3`** - Audio file for background music
   - The song "Comfortably Numb" by Pink Floyd
   - Will auto-play when the website loads
   - Place in the root directory
   - Optional: Also include `comfortably-numb.ogg` as a fallback

## File Structure

```
pinkfloyd/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript for interactivity
├── prism-light.png     # (You need to add this)
├── pink-floyd-logo.png # (You need to add this)
├── comfortably-numb.mp3 # (You need to add this)
└── README.md           # This file
```

## Usage

1. Add the required image and audio files listed above
2. Open `index.html` in a web browser
3. The audio will attempt to auto-play (may require user interaction in some browsers)
4. Use the play/pause button in the top-right corner to control audio

## Customization

### Social Media Links

Edit the social links in `index.html` (footer section) to add your actual social media URLs:

```html
<a href="YOUR_INSTAGRAM_URL" class="social-link" data-platform="instagram">
```

### Colors

Prism colors are defined in CSS variables at the top of `styles.css`. You can adjust:
- `--prism-red`, `--prism-orange`, `--prism-yellow`, etc.
- `--neon-pink`, `--neon-purple`, `--neon-blue`
- Glow effects and opacity values

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- HTML5 Audio API support required

## Notes

- The website uses only HTML, CSS, and vanilla JavaScript (no frameworks)
- All animations are CSS-based for optimal performance
- The design is fully responsive and mobile-friendly
- Audio auto-play may be blocked by browser policies (user interaction may be required)

## License

This is a personal fan website. Pink Floyd's music and imagery are property of their respective owners.

