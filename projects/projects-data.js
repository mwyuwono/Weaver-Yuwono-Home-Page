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
  { id: 'architecture', label: 'Architecture', blurb: 'Houses I have designed, from first sketch to construction drawings.' },
  { id: 'art', label: 'Artworks', blurb: 'Drawings and paintings.' },
  { id: 'tools', label: 'AI tools', blurb: 'Software tools I have built.' },
  { id: 'built', label: 'Built projects', blurb: 'Physical things I have designed and made.' }
];

window.WY_PROJECTS = [
  {
    slug: 'connecticut-cottage',
    category: 'architecture',
    title: 'Friday Cottage',
    location: 'Sharon, Connecticut',
    year: '2021',
    type: 'New house · Built',
    headline: 'A weekend house designed for the Sharon historic district.',
    summary: [
      'Friday Cottage is a house in Litchfield County, Connecticut, that I designed as our weekend retreat. My knowledge of architecture is self-taught, built on a lifelong interest in historic houses. This project gave me the chance to design a house from scratch and to take responsibility for making every part fit together and work.',
      'The design covered the whole house: the layout of three floors, the fireplace and chimney, and the selection of every window, door, floor finish, outlet and light fixture. It had to meet the requirements of the Sharon Historic District Commission and the Wetlands Commission, and the drawings required a licensed building engineer’s stamp.',
      'The site set the main constraints. The house would replace a non-historic building in Sharon’s historic district, and regulations required it to stay within the existing footprint. The design therefore rises across three levels, with retaining walls to handle the change in grade. Wetlands on the site and a replacement septic system, designed by a third party, further shaped the plan.',
      'The design uses a vernacular Greek Revival style, the plain version of the style that spread through rural New England in the nineteenth century, much of it built by local carpenters working from pattern books such as Asher Benjamin’s. The style suited the project for two reasons: it is achievable within budget, and its proportions and details give a compact house a sense of occasion. The front is symmetrical, with corner pilasters, frieze windows under the eaves and a detailed entry. The design specifies natural materials: cedar siding and trim, wood windows, a tumbled brick chimney on the living room’s outside wall serving a wood-burning fireplace, and soapstone counters on custom kitchen cabinets. The aim was a house that fits into the historic fabric of Litchfield County.',
      'I drafted the complete set of design documents in AutoCAD: plans, exterior and interior elevations, trim and entry details, kitchen drawings, and window, door, finish, power and lighting schedules. Both commissions approved the design, and the engineer stamped the drawings as part of building approval.'
    ],
    facts: [
      { label: 'Role', value: 'Designer' },
      { label: 'Approvals', value: 'Historic district commission, wetlands commission, engineer’s stamp' },
      { label: 'Status', value: 'Built' },
      { label: 'Drawings', value: '14-sheet set, renderings, 3D model' }
    ],
    card: {
      src: '../projects/assets/images/sharon-thumb-900.jpg',
      srcset: '../projects/assets/images/sharon-thumb-900.jpg 900w, ../projects/assets/images/sharon-thumb-1536.jpg 1536w',
      alt: 'The Sharon house: white clapboard Greek Revival with a brick chimney, set in a meadow'
    },
    hero: {
      src: '../assets/images/sharon-thumb-1536.jpg',
      srcset: '../assets/images/sharon-thumb-900.jpg 900w, ../assets/images/sharon-thumb-1536.jpg 1536w',
      alt: 'Rendering of the front of the house: white clapboard, corner pilasters, frieze windows and a brick chimney, set in a meadow',
      caption: 'Rendering, front elevation'
    },
    model: {
      href: 'model/',
      embed: true,
      image: '../assets/images/sharon-model-exploded.jpg',
      alt: 'Exploded 3D model of the house showing basement, first floor, second floor and roof separated',
      caption: 'A 3D model built from the drawings. Drag to rotate it here, or open it full screen to separate the floors, view one level at a time, and zoom.'
    },
    moves: [
      { title: 'Fits the historic district', body: 'Vernacular Greek Revival proportions, trim and materials that match the older houses of Litchfield County: corner pilasters, frieze windows and a detailed entry.' },
      { title: 'Three levels on the original footprint', body: 'Regulations limited the house to the existing footprint, so the plan rises across three levels, with retaining walls for the change in grade.' },
      { title: 'Drawn for construction', body: 'A complete AutoCAD set covers plans, elevations, trim and entry details and the kitchen, with schedules for windows, doors, finishes, power and lighting.' }
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
    type: 'Renovation · Owner and designer',
    headline: 'Renovation of a historic house I owned. The kitchen was the highlight.',
    summary: 'I owned this house in Rome, Georgia and designed its renovation. I measured and drew the existing house first, then redesigned the kitchen and the primary and guest baths and added a rear porch.',
    facts: [
      { label: 'Role', value: 'Designer and owner' },
      { label: 'Scope', value: 'About 2,500 sq ft; kitchen, two baths, rear porch' },
      { label: 'Drawings', value: '10-sheet set, kitchen renderings' },
      { label: 'Tools', value: 'AutoCAD' }
    ],
    card: {
      src: '../projects/assets/images/rome-thumb-900.jpg',
      srcset: '../projects/assets/images/rome-thumb-900.jpg 900w, ../projects/assets/images/rome-thumb-1536.jpg 1536w',
      alt: 'The Rome house: gray shingle with steep gables, below the city clock tower'
    },
    hero: {
      src: '../assets/images/rome-thumb-1536.jpg',
      srcset: '../assets/images/rome-thumb-900.jpg 900w, ../assets/images/rome-thumb-1536.jpg 1536w',
      alt: 'Rendering of the house from the street: gray shingle walls, steep gables and an arched front door, with the city clock tower behind',
      caption: 'Rendering, the house from the street'
    },
    feature: {
      heading: 'The kitchen',
      images: [
        {
          src: '../assets/images/rome-kitchen-view.jpg',
          alt: 'Rendering of the kitchen: a marble-topped island with four leather stools, a range wall between two refrigerators, beadboard walls, a tall window and a half-glass black door',
          caption: 'Rendering of the kitchen'
        },
        {
          src: '../assets/images/rome-kitchen-2000.jpg',
          full: '../assets/images/rome-kitchen-full.jpg',
          alt: 'Rendered elevations of two kitchen walls: glass-front cabinets, a marble backsplash and an arched opening above; a range wall between two refrigerators, a window and a half-glass door below',
          caption: 'Rendered elevations of the main kitchen walls'
        }
      ]
    },
    moves: [
      { title: 'Measured the house first', body: 'As-built plans of both floors were the starting point for design, pricing and demolition.' },
      { title: 'Showed what changes', body: 'Demolition plans mark what stays, what comes out and what is new.' },
      { title: 'Detailed the key rooms', body: 'The kitchen, both baths and the rear porch are drawn in elevation.' }
    ],
    sheets: [
      { src: '../assets/sheets/rome-renovation-01.jpg', full: '../assets/sheets/rome-renovation-01.svg', label: 'A101', title: 'Existing conditions, as built' },
      { src: '../assets/sheets/rome-renovation-02.jpg', full: '../assets/sheets/rome-renovation-02.svg', label: 'A102', title: 'First floor demolition and new work' },
      { src: '../assets/sheets/rome-renovation-04.jpg', full: '../assets/sheets/rome-renovation-04.svg', label: 'A104', title: 'First floor plan' },
      { src: '../assets/sheets/rome-renovation-06.jpg', full: '../assets/sheets/rome-renovation-06.svg', label: 'A201', title: 'Rear porch addition, elevations' },
      { src: '../assets/sheets/rome-renovation-07.jpg', full: '../assets/sheets/rome-renovation-07.svg', label: 'A202', title: 'Kitchen elevations and details' },
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
    headline: 'A gallery of my drawings and paintings.',
    card: {
      src: '../projects/assets/images/art-ionic-capital-800.jpg',
      srcset: '../projects/assets/images/art-ionic-capital-800.jpg 800w, ../projects/assets/images/art-ionic-capital-1370.jpg 1370w',
      alt: 'Framed ink and wash drawing of an Ionic capital with its volute and egg-and-dart moulding'
    }
  }
];
