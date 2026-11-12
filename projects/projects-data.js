/**
 * Projects content model — single source for the /projects/ index cards and every case page.
 *
 * To add a project: append an entry here, create projects/<slug>/index.html from an existing
 * case page shell (it only sets data-project="<slug>"), and put images under projects/assets/.
 * Optional fields (model, outcome, notes) render only when present.
 * Entries with `href` instead of a case page (e.g. the art site) link out and need no shell.
 * `category` must match an id in WY_CATEGORIES; categories with no entries are hidden.
 *
 * Public file: never put addresses, owner names, phone numbers or other private detail here.
 */
window.WY_CATEGORIES = [
  { id: 'architecture', label: 'Architecture', blurb: 'Residential design, carried from survey or first sketch to a drawing set a builder can price from.' },
  { id: 'art', label: 'Drawing', blurb: 'Academic and architectural drawing in graphite, ink and wash.' },
  { id: 'tools', label: 'AI tools', blurb: 'Software I have built for my own work.' },
  { id: 'built', label: 'Built work', blurb: 'Physical projects, documented from plan to finished piece.' }
];

window.WY_PROJECTS = [
  {
    slug: 'connecticut-cottage',
    category: 'architecture',
    title: 'Greek Revival House',
    location: 'Sharon, Connecticut',
    year: '2021',
    type: 'New residence',
    headline: 'A Greek Revival house for a historic New England village, carried from concept to a complete 14-sheet drawing set',
    summary: 'I designed a two-story house on a full basement in the vocabulary of the village around it, then documented it to the level a builder and a historic district commission can work from: plans, elevations, trim and entry details, interior elevations, and a schedule for every system. The house exists here as drawings and renderings; I later built an interactive 3D model from the same dimensions so the design can be read without a plan set.',
    facts: [
      { label: 'Role', value: 'Designer and owner' },
      { label: 'Scope', value: 'New two-story house on a full basement' },
      { label: 'Deliverable', value: '14-sheet drawing set, renderings, 3D model' },
      { label: 'Tools', value: 'AutoCAD, Photoshop, Three.js' }
    ],
    card: {
      src: '../projects/assets/images/sharon-render-800.jpg',
      srcset: '../projects/assets/images/sharon-render-800.jpg 800w, ../projects/assets/images/sharon-render-1600.jpg 1600w',
      alt: 'Rendering of a white clapboard Greek Revival house with a brick chimney'
    },
    hero: {
      src: '../assets/images/sharon-render-1600.jpg',
      srcset: '../assets/images/sharon-render-800.jpg 800w, ../assets/images/sharon-render-1600.jpg 1600w',
      alt: 'Rendering of the front elevation: white clapboard, corner pilasters, frieze windows and a brick chimney',
      caption: 'Rendering, front elevation'
    },
    model: {
      href: 'model/',
      image: '../assets/images/sharon-model-exploded.jpg',
      alt: 'Exploded 3D model of the house showing basement, first floor, second floor and roof separated',
      caption: 'Interactive 3D model built from the drawing dimensions. Explode the floors, isolate a level, orbit and zoom.'
    },
    moves: [
      { title: 'Period vocabulary, drawn to be built', body: 'Corner pilasters, a full entablature with frieze windows, and a pedimented entry, each detailed at trim scale rather than left to interpretation on site.' },
      { title: 'Interiors resolved before construction', body: 'Kitchen and living room elevations fix casework, fixtures and openings, so the key rooms are decided on paper, where changes are cheap.' },
      { title: 'One document every trade prices from', body: 'Window and door, flooring, power and lighting schedules turn the set into a single specification rather than a set of pictures.' }
    ],
    sheets: [
      { src: '../assets/sheets/connecticut-cottage-07.jpg', full: '../assets/sheets/connecticut-cottage-07-full.jpg', label: 'Renderings', title: 'Four elevations, rendered' },
      { src: '../assets/sheets/connecticut-cottage-04.jpg', full: '../assets/sheets/connecticut-cottage-04.svg', label: 'A-201', title: 'Front and right elevations' },
      { src: '../assets/sheets/connecticut-cottage-02.jpg', full: '../assets/sheets/connecticut-cottage-02.svg', label: 'A-102', title: 'First floor plan' },
      { src: '../assets/sheets/connecticut-cottage-06.jpg', full: '../assets/sheets/connecticut-cottage-06.svg', label: 'A-203', title: 'Trim detail' },
      { src: '../assets/sheets/connecticut-cottage-08.jpg', full: '../assets/sheets/connecticut-cottage-08.svg', label: 'A-401', title: 'Kitchen plan and elevations' },
      { src: '../assets/sheets/connecticut-cottage-11.jpg', full: '../assets/sheets/connecticut-cottage-11.svg', label: 'A-601', title: 'Window and door schedule' }
    ],
    pdf: { href: '../assets/pdfs/connecticut-cottage.pdf', label: 'Full drawing set', meta: '14 sheets · PDF · 5.8 MB' }
  },
  {
    slug: 'rome-renovation',
    category: 'architecture',
    title: 'Historic Renovation',
    location: 'Rome, Georgia',
    year: '2021',
    type: 'Renovation and addition',
    headline: 'A 2,500 sq ft historic house, measured as it stands and redesigned room by room',
    summary: 'I started by surveying the existing house and drawing it as built, so every decision that followed rested on fact rather than assumption. From that baseline I separated what comes out from what goes in, then redesigned the rooms that carry the cost and the daily use: the kitchen, the primary and guest baths, and a new rear porch addition.',
    facts: [
      { label: 'Role', value: 'Designer and owner' },
      { label: 'Scope', value: 'c. 2,500 sq ft renovation and rear addition' },
      { label: 'Deliverable', value: '10-sheet drawing set' },
      { label: 'Tools', value: 'AutoCAD' }
    ],
    card: {
      src: '../projects/assets/images/rome-renovation-800.jpg',
      srcset: '../projects/assets/images/rome-renovation-500.jpg 500w, ../projects/assets/images/rome-renovation-800.jpg 800w, ../projects/assets/images/rome-renovation.jpg 999w',
      alt: 'Shingle-clad historic house with arched entry, set in a garden'
    },
    hero: {
      src: '../assets/images/rome-renovation.jpg',
      srcset: '../assets/images/rome-renovation-800.jpg 800w, ../assets/images/rome-renovation.jpg 999w',
      alt: 'The house from the street: brown shingle walls, steep gables and an arched front door',
      caption: 'The house from the street'
    },
    moves: [
      { title: 'Document the current state first', body: 'Measured as-built plans of both floors became the single baseline for design, pricing and demolition.' },
      { title: 'Make every removal explicit', body: 'Demolition plans separate existing, removed and new work, so scope and cost are visible before anyone opens a wall.' },
      { title: 'Detail the rooms that carry the cost', body: 'Interior elevations for the kitchen and both baths, plus exterior elevations for the rear porch addition, fix the decisions that drive budget.' }
    ],
    sheets: [
      { src: '../assets/sheets/rome-renovation-01.jpg', full: '../assets/sheets/rome-renovation-01.svg', label: 'A101', title: 'Existing conditions, as built' },
      { src: '../assets/sheets/rome-renovation-02.jpg', full: '../assets/sheets/rome-renovation-02.svg', label: 'A102', title: 'First floor demolition and new work' },
      { src: '../assets/sheets/rome-renovation-04.jpg', full: '../assets/sheets/rome-renovation-04.svg', label: 'A104', title: 'First floor plan' },
      { src: '../assets/sheets/rome-renovation-06.jpg', full: '../assets/sheets/rome-renovation-06.svg', label: 'A201', title: 'Rear porch addition, elevations' },
      { src: '../assets/sheets/rome-renovation-07.jpg', full: '../assets/sheets/rome-renovation-07-full.jpg', label: 'A202', title: 'Kitchen elevations and details' },
      { src: '../assets/sheets/rome-renovation-08.jpg', full: '../assets/sheets/rome-renovation-08.svg', label: 'A203', title: 'Primary bath' }
    ],
    pdf: { href: '../assets/pdfs/rome-renovation.pdf', label: 'Full drawing set', meta: '10 sheets · PDF · 2 MB' }
  },
  {
    slug: 'artwork',
    category: 'art',
    href: 'https://art.weaver-yuwono.com/',
    title: 'Original Artworks',
    location: 'art.weaver-yuwono.com',
    year: '',
    type: 'Online gallery',
    headline: 'A curated gallery of my drawings: classical figure and cast studies, architectural ornament and shade-and-shadow exercises',
    card: {
      src: '../projects/assets/images/art-ionic-capital-800.jpg',
      srcset: '../projects/assets/images/art-ionic-capital-800.jpg 800w, ../projects/assets/images/art-ionic-capital-1370.jpg 1370w',
      alt: 'Framed ink and wash drawing of an Ionic capital with its volute and egg-and-dart moulding'
    }
  }
];
