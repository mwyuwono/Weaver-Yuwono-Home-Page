/**
 * Projects content model — single source for the /projects/ index cards and every case page.
 *
 * To add a project: append an entry here, create projects/<slug>/index.html from an existing
 * case page shell (it only sets data-project="<slug>"), and put images under projects/assets/.
 * Optional fields render only when present: hero; features (sections with heading, body, quote, facts,
 * grid, variant, and images with caption, label, shape); moves (+ movesHeading, movesFirst); model;
 * sheets + pdf; outcome (string or paragraphs, + outcomeHeading).
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
      'In 2019, we purchased a modest 1950s cottage on what is arguably one of the most beautiful streets in Litchfield County, Connecticut. Our intention was to renovate the 1,300-square-foot house as a weekend retreat from New York City. Although the house itself had little architectural merit, with seven-foot ceilings and rather uninspired proportions, its setting in the Connecticut countryside, surrounded by distinguished historic houses, was difficult to resist.',
      'For me, the project offered an opportunity to put a lifelong interest in historic architecture into practice. My ambition was to create a house that felt appropriate to its surroundings, drawing on the architectural traditions of the region to produce something that might plausibly have stood there for the past 150 years.',
      'We initially explored a substantial renovation of the existing structure. However, it soon became apparent that some of our basic requirements, particularly more generous ceiling heights, would be difficult and costly to achieve within the original building. Because I was undertaking the design myself, I had the freedom to explore numerous alternatives without the usual constraints of a conventional architect-client relationship. Several schemes would have substantially improved the house, but each required compromises that ultimately made renovation difficult to justify.',
      'The decision to build anew was driven by a combination of practical requirements: additional living space, higher ceilings, and my particular insistence on a wood-burning fireplace. Although the property was within a designated historic district, the existing house was not itself historic, making replacement a possibility, subject to approval by the Historic District Commission.',
      'The site presented another set of challenges. A stream running along the rear of the property placed much of the land under the jurisdiction of the Wetlands Commission. Together with local zoning and setback requirements, the resulting restrictions effectively prevented us from expanding the building’s footprint on three sides.',
      'These constraints ultimately informed the design. Rather than extending outward, I developed a scheme that introduced a full basement and a complete second story in place of the original one-and-a-half-story structure. This allowed us to achieve the additional square footage and more generous interior proportions we wanted while working largely within the existing footprint.',
      'For the architectural language, I turned to the vernacular Greek Revival that spread through rural New England in the nineteenth century, much of it built by local carpenters working from pattern books such as Asher Benjamin’s. The style suited both the budget and the scale of the house; its proportions and restrained detailing lend a compact building a sense of occasion. The front is symmetrical, with corner pilasters, frieze windows beneath the eaves and a carefully detailed entry. The materials are natural throughout: cedar siding and trim, wood windows, soapstone counters on custom kitchen cabinets, and a tumbled brick chimney on the living room’s outside wall serving the wood-burning fireplace.',
      'I drafted the complete set of design documents in AutoCAD: plans, exterior and interior elevations, trim and entry details, kitchen drawings, and schedules for every window, door, finish, outlet and light fixture. Both commissions approved the design, a licensed engineer stamped the drawings, and the house was built.'
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
      { src: '../assets/sheets/connecticut-cottage-renderings.jpg', full: '../assets/sheets/connecticut-cottage-renderings.jpg', label: 'Renderings', title: 'Four elevations, rendered' },
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
  },
  {
    slug: 'andover-trask',
    category: 'built',
    title: 'Andover Trask',
    location: 'Atlanta, Georgia',
    year: '2010–2015',
    headline: 'Andover Trask',
    summary: [
      'I taught myself to sew from library books and turned the hobby into Andover Trask, a company that made canvas and leather bags in Atlanta for five years.',
      'Andover Trask made handsome, functional bags from American canvas and leather, built to be carried every day rather than kept for best. I designed every product and the brand around it, made the bags with a small team in our own studio, and ran the business, from purchasing and bookkeeping to wholesale and press. West Elm stocked our bags, Ledbury collaborated with us, and the brand drew more than 25 press features, including an interview on WABE, Atlanta’s NPR station.'
    ],
    facts: [
      { label: 'Role', value: 'Founder and designer' },
      { label: 'Line', value: 'About ten designs in more than 20 colorways' },
      { label: 'Stocked by', value: 'West Elm, Avalon and Ponce City Market' },
      { label: 'Press', value: 'More than 25 features, 2012–2015' }
    ],
    card: {
      src: 'assets/images/andover-trask-lineup-900.jpg',
      srcset: 'assets/images/andover-trask-lineup-900.jpg 900w, assets/images/andover-trask-lineup-1536.jpg 1536w',
      alt: 'Andover Trask canvas totes with leather handles and contrasting bases'
    },
    hero: {
      src: '../assets/images/andover-trask-bench-1536.jpg',
      srcset: '../assets/images/andover-trask-bench-900.jpg 900w, ../assets/images/andover-trask-bench-1536.jpg 1536w',
      alt: 'A man setting a dark green canvas tote with leather handles on a weathered wooden bench in front of a brick wall',
      caption: 'From a 2015 product shoot'
    },
    features: [
      {
        heading: 'The Standard Bag',
        variant: 'split',
        body: [
          'It started with one bag. I spent about three years on the Standard Bag before I sold one: a canvas tote with leather handles and copper rivets, made from materials that were as durable as they were good-looking. I worked by a line of Arthur Ashe’s: “Start where you are. Use what you have. Do what you can.” Part of the inspiration was my grandfather, a cobbler in Cedartown, Georgia; a photograph of him at work hung in our studio.',
          'I shared my progress online, friends asked for bags of their own, and a feature in The Atlanta Journal-Constitution turned the hobby into a business. By 2015 it had become the Waxed Standard, in 20-ounce waxed canvas.'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-standard-bag-960.jpg',
            alt: 'A man carrying a Standard Bag over his shoulder: natural canvas body, olive canvas base and dark brown leather handles',
            caption: 'The Standard Bag in olive'
          }
        ]
      },
      {
        heading: 'Building the line',
        variant: 'catalog',
        grid: true,
        body: [
          'From the Standard Bag I built a wholesale line. By 2015 it had about ten designs in more than 20 colorways, from the Huck, a smaller everyday tote, to the Harper, a take on the classic tool bag and our most popular product with florists, stylists, artists and bartenders. Many took their names from American literature; others, like the Beaufort and the Hatteras, from Southern places.',
          'The materials were specified as closely as the shapes: #10 cotton duck and canvas from 14 to 22 ounces, vegetable-tanned and bridle leather, solid brass rivets and double-needle stitching. The leather came from Pennsylvania, the canvas from New England, and the machinery and sewing supplies from Georgia. Every piece carried the stamp “Andover Trask / Made in Atlanta.”'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-harper-line-960.jpg',
            alt: 'Harper tool tote: natural canvas lower with eight exterior pockets, olive canvas upper, zip closure and tan leather straps',
            caption: 'Harper, our most popular design'
          },
          {
            src: '../assets/images/andover-trask-waxed-standard-960.jpg',
            alt: 'Waxed Standard tote in natural waxed canvas with a charcoal waxed base and natural leather straps',
            caption: 'Waxed Standard, in 20-ounce waxed canvas'
          },
          {
            src: '../assets/images/andover-trask-huck-960.jpg',
            alt: 'Huck tote with a natural canvas upper, orange base and natural leather handles with washer details',
            caption: 'Huck, a smaller tote with a contrasting base'
          },
          {
            src: '../assets/images/andover-trask-beaufort-960.jpg',
            alt: 'Beaufort tote in forest green canvas with leather shoulder straps and riveted tone-on-tone reinforcements',
            caption: 'Beaufort, in 18-ounce canvas'
          },
          {
            src: '../assets/images/andover-trask-faulkner-line-960.jpg',
            alt: 'Faulkner bag in natural canvas with a navy base and natural webbing handles',
            caption: 'Faulkner, in 22-ounce canvas with a double bottom'
          },
          {
            src: '../assets/images/andover-trask-hatteras-line-960.jpg',
            alt: 'Hatteras tote in gray and natural hand-woven cotton stripe with natural leather handles',
            caption: 'Hatteras, in hand-woven cotton stripe'
          },
          {
            src: '../assets/images/andover-trask-sawyer-960.jpg',
            alt: 'Sawyer tote with a gray canvas upper, natural canvas lower, front pocket and natural leather straps',
            caption: 'Sawyer, in 18-ounce American canvas'
          },
          {
            src: '../assets/images/andover-trask-knox-960.jpg',
            alt: 'Knox tote in navy canvas with four exterior pockets and brown bridle leather handles',
            caption: 'Knox, with four exterior pockets'
          },
          {
            src: '../assets/images/andover-trask-apron-line-960.jpg',
            alt: 'Natural canvas apron with vegetable-tanned leather straps, brass hardware and four pockets',
            caption: 'Canvas and leather apron, designed for creative work'
          }
        ]
      },
      {
        heading: 'From drawing to production',
        variant: 'drawings',
        grid: true,
        body: 'I drew each design in Illustrator, with every panel, pocket and strap measured and the construction noted, then made a prototype and refined it before it went into production.',
        images: [
          {
            src: '../assets/sheets/andover-trask-finch-900.png',
            full: '../assets/sheets/andover-trask-finch-2000.png',
            alt: 'Finch drawing: the finished bag, its outline and its three pattern pieces with measurements',
            label: 'Finch',
            caption: 'Exterior panels, leather base and mitered pocket corners'
          },
          {
            src: '../assets/sheets/andover-trask-coal-bag-900.png',
            full: '../assets/sheets/andover-trask-coal-bag-2000.png',
            alt: 'Coal Bag drawing: a table of colorways, the bag in elevation and plan, and its pattern pieces with measurements',
            label: 'Coal Bag',
            caption: 'Colorways, measurements and the inside hanging pocket'
          },
          {
            src: '../assets/sheets/andover-trask-apron-schematic-900.png',
            full: '../assets/sheets/andover-trask-apron-schematic-2000.png',
            alt: 'Apron drawing: outline with two chest pockets, a divided front pocket and a leather neck strap',
            label: 'Apron',
            caption: 'Pockets, stitching and the leather neck strap'
          },
          {
            src: '../assets/sheets/andover-trask-harper-drawing-900.png',
            full: '../assets/sheets/andover-trask-harper-drawing-2000.png',
            alt: 'Harper rendering: a gray and natural canvas bag with tan leather handles and a leather label',
            label: 'Harper',
            caption: 'Product rendering'
          }
        ]
      },
      {
        heading: 'The brand',
        variant: 'brand',
        grid: true,
        body: [
          'I designed the identity myself: the monogram and wordmark, the debossed leather labels and brass branding stamp, the stationery and the website. I also photographed the products for the site.',
          'The brand’s line was “Carry it with you.” The copy promised goods made by hand from natural materials that wear in, each taking on its own character, with proportions drawn from storied Southern architecture. The wholesale line sheet set out each design for buyers, with its materials, dimensions and colorways.'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-logo-1536.png',
            alt: 'The Andover Trask monogram, an ampersand and T in a black circle, above the wordmark',
            caption: 'Monogram and wordmark'
          },
          {
            src: '../assets/images/andover-trask-stationery-1536.jpg',
            alt: 'Andover Trask letterhead reading Atl, GA, beside a pen',
            caption: 'Letterhead'
          },
          {
            src: '../assets/images/andover-trask-brand-details-1536.jpg',
            alt: 'Canvas tote with riveted leather handles beside Andover Trask stationery, a brass stamp and hand tools',
            caption: 'Stationery, branding stamp and hardware beside a finished tote. Photograph by Sawyer Baird.',
            shape: 'wide'
          },
          {
            src: '../assets/images/andover-trask-line-sheet-cover-960.jpg',
            alt: 'Cover of the Andover Trask wholesale line sheet: canvas and leather totes on a stone step in front of a carved wooden door',
            caption: 'Wholesale line sheet, 2015: cover'
          },
          {
            src: '../assets/images/andover-trask-line-sheet-harper-960.jpg',
            alt: 'Line sheet page for the Harper tool tote, with a product photograph, description and specifications',
            caption: 'Line sheet page for the Harper'
          }
        ]
      },
      {
        heading: 'In the studio',
        variant: 'studio',
        grid: true,
        body: 'We made everything in our own studio in Atlanta. I ran it with one full-time employee and part-time help, and handled the purchasing, bookkeeping and production alongside the design.',
        images: [
          {
            src: '../assets/images/andover-trask-studio-1536.jpg',
            alt: 'Matt Weaver at a sewing machine in the Andover Trask studio',
            caption: 'At work in the Atlanta studio. Photograph by Sawyer Baird.',
            shape: 'wide'
          },
          {
            src: '../assets/images/andover-trask-workbench-1536.jpg',
            alt: 'Hand tools and a dish of brass hardware on a notebook page of measurements headed Finch, on a dark workbench',
            caption: 'Working notes for the Finch, February 2014'
          },
          {
            src: '../assets/images/andover-trask-sewing-1536.jpg',
            alt: 'Hands guiding material through an industrial sewing machine',
            caption: 'Sewing in the studio'
          },
          {
            src: '../assets/images/andover-trask-handle-punch-1536.jpg',
            alt: 'Hands using a rotary punch on a leather handle beside a canvas tote',
            caption: 'Punching holes in a leather handle. Photograph by Sawyer Baird.',
            shape: 'tall'
          },
          {
            src: '../assets/images/andover-trask-apron-960.jpg',
            alt: 'Detail of a natural canvas apron hanging by its leather neck strap, with two small stitched pockets',
            caption: 'Canvas apron with a leather neck strap',
            shape: 'tall'
          }
        ]
      },
      {
        heading: 'Partners, press and giving back',
        variant: 'reach',
        grid: true,
        body: [
          'West Elm chose Andover Trask for the local makers’ collections at its Avalon store in Alpharetta, which opened in 2014, and at its Ponce City Market store in Atlanta in 2015. Ledbury, the Richmond shirtmaker, collaborated with us in 2015.',
          'Through A Book for Every Bag, each bag bought on our website paid for a new book for a child or young adult with little access to books: a fitting return for a business that began with library books.',
          'Between 2012 and 2015 the brand appeared in more than 25 publications, from The Atlanta Journal-Constitution and Southern Living’s Hot List to Atlanta magazine, UrbanDaddy and Jezebel, and I talked about the business on WABE’s City Lights.'
        ],
        quote: { text: 'Take everything to go with the all-American totes of Andover Trask.', cite: 'Atlanta Homes & Lifestyles, 2013' },
        images: [
          {
            src: '../assets/images/andover-trask-shoot-chair-960.jpg',
            alt: 'A man in a straw hat seated on a red chair, with a natural and orange canvas tote at his side'
          },
          {
            src: '../assets/images/andover-trask-shoot-street-960.jpg',
            alt: 'A woman sitting on a curb in front of a brick wall, with a dark canvas tote with leather handles beside her'
          }
        ]
      }
    ],
    outcomeHeading: 'What it taught me',
    outcome: [
      'I sold Andover Trask in 2015. Building it from a hobby was the broadest education I have had in making things and bringing them to market.',
      'It took craft: sewing, patterning and leatherwork, learned by hand. It took product design: drawing each bag for production and refining it through prototypes. It took brand building, from the identity to the photography and website, and business management: purchasing, bookkeeping, managing a team and selling wholesale to a national retailer. The results came in the same range, from West Elm’s local makers’ collections and a collaboration with Ledbury to an interview on Atlanta’s NPR station and more than 25 features in three years.'
    ]
  }
];
