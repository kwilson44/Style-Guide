# LEGO Style Guide

A web-based tool that allows users to create and customize LEGO minifigures with a focus on diversity and representation. This project specifically highlights options for Black-coded hairstyles and diverse flesh tones.

## Features

- **Flesh Tone Selection**: Choose from various LEGO flesh tones with real-world representation
- **Expression Selection**: Pick facial expressions (with availability indicators)
- **Accessibility Options**: Add glasses, hearing aids, and other inclusive accessories
- **Hairstyle Browser**: 
  - Filter by style categories (Braided, Coiled/Afro, Locs, Updos)
  - Toggle between natural and fantasy colors
  - View detailed part information with BrickLink references
- **Advocacy Tools**: Built-in system to suggest missing parts to LEGO

## Project Structure

```
/Style Guide/
├── index.js             # Main application logic
├── hair-display.js      # Hair selection functionality
├── availability-data.js # Data for part availability
├── style.css           # Main stylesheet
├── hair-display.css    # Hair display specific styles
├── black_coded_hair_pieces.json # Database of hair pieces
└── images/             # Image assets directory
```

## Setup

1. Clone the repository
2. Place all required images in the `images/` directory
3. Open `lego-hairstyle-selector.html` in a web browser

## Image Requirements

The following image types are needed:
- Flesh tone reference images
- Expression headprints for each flesh tone
- Hair piece images (named by part number)
- Accessory images
- UI elements (logos, icons)

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- JSON for data storage


## License

This project is part of the Women's Brick Initiative efforts to promote diversity in LEGO.

## Credits

- Hair piece data sourced from BrickLink
- Part numbers and availability data from LEGO's official catalog
- Project initiated by the Women's Brick Initiative
