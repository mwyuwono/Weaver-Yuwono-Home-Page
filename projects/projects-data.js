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
    headline: 'A new kitchen for a historic house.',
    summary: [
      'I owned this house below Rome’s city clock tower and designed its renovation in 2021. I focused on the kitchen, redesigned the two upstairs baths and drew a covered porch for the rear courtyard.',
      'I began by measuring and drawing both floors in AutoCAD. The survey recorded details that would affect the work, including the sloping dormer ceilings and changes in ceiling height upstairs. From there I drew the demolition and proposed plans, then worked through the rooms in elevation.'
    ],
    facts: [
      { label: 'Role', value: 'Designer and owner' },
      { label: 'Existing house', value: 'About 2,500 sq ft' },
      { label: 'Scope', value: 'Kitchen, two baths and rear porch' },
      { label: 'Drawings', value: '10 AutoCAD sheets and renderings' }
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
    features: [
      {
        heading: 'The kitchen',
        body: [
          'I put the sink, dishwasher and pull-out bins on the working side of a ten-foot island, with seating for four on the other. A refrigerator and a separate freezer flank the range. The elevations show how the cabinetry fits around the tall window and the proposed Dutch door.',
          'I drew all four walls and all four sides of the island, down to the inset beadboard panels and the cabinet profile. At the arched opening, the marble backsplash continues to the floor and meets an ogee-edged marble base.'
        ],
        images: [
          {
            src: '../assets/images/rome-kitchen-view.jpg',
            alt: 'Perspective of the kitchen showing four stools at the marble-topped island and the range framed by tall appliances',
            caption: 'Kitchen perspective rendering'
          },
          {
            src: '../assets/images/rome-kitchen-2000.jpg',
            full: '../assets/images/rome-kitchen-full.jpg',
            alt: 'Rendered elevations of the glass-front cabinetry and arched opening, and of the range wall with its tall window and Dutch door',
            caption: 'Rendered elevations of the cabinet and range walls'
          }
        ]
      },
      {
        heading: 'First-floor changes',
        body: 'I drew the first-floor demolition and proposed plans at the same scale, using the main stair and entry hall as reference points. The island appears in the kitchen on the left, and the new porch projects into the courtyard at the rear.',
        grid: true,
        images: [
          {
            src: '../assets/images/rome-first-floor-demolition.webp',
            alt: 'First-floor demolition plan, with the existing kitchen left of the entry hall and the main stair in the center',
            caption: 'Demolition plan · Orange marks removals'
          },
          {
            src: '../assets/images/rome-first-floor-proposed.webp',
            alt: 'Proposed first-floor plan at the same scale, with the new kitchen island at left and the rear porch above the study',
            caption: 'Proposed plan · Blue marks new construction'
          }
        ]
      },
      {
        heading: 'The courtyard porch',
        body: 'I set the porch floor level with the rear entry and specified a brick floor, a metal roof and four Doric wood columns. The porch drawings also show fixed shutters for privacy and a Roman-lattice railing at the rear entry. I proposed a wood-burning fireplace opposite the existing fireplace in the study, with the possibility of using the existing chimney.',
        images: [
          {
            src: '../assets/images/rome-rear-porch-elevation.webp',
            alt: 'Rear elevation showing the proposed pedimented porch and its columns in front of the existing house',
            label: 'A201',
            caption: 'Rear elevation with the proposed porch'
          }
        ]
      },
      {
        heading: 'The upstairs baths',
        body: 'In the primary bath, I detailed marble trim and a recessed shower niche. The guest bath drawings record a ceiling that varies by several inches and show storage recessed into the wall beside the sink, concealed behind a flush door.',
        grid: true,
        images: [
          {
            src: '../assets/images/rome-primary-bath-elevation.webp',
            alt: 'Primary bath elevation showing the fireplace surround between two windows',
            label: 'A203',
            caption: 'Primary bath, fireplace wall'
          },
          {
            src: '../assets/images/rome-guest-bath-elevation.webp',
            alt: 'Guest bath elevation with a pedestal sink and a section through the adjacent concealed storage',
            label: 'A204',
            caption: 'Guest bath, concealed storage beside the sink'
          }
        ]
      }
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
      'Making a well-built canvas bag for myself grew into Andover Trask, an Atlanta brand of canvas and leather goods, sold direct to customers and featured in more than 25 publications.',
      'Andover Trask made handsome, functional bags from American canvas and leather, built to be carried every day rather than kept for best. I taught myself to sew from library books, designed every product and the brand around it, made the bags with a small team in our own studio, and ran the business, from purchasing and bookkeeping to wholesale and press. Ledbury, The Bitter Southerner and Appointed collaborated with us, and I talked about the business on WABE, Atlanta’s NPR station.'
    ],
    facts: [
      { label: 'Role', value: 'Founder and designer' },
      { label: 'Products', value: 'Canvas and leather goods, including totes, tool bags, aprons and zip pouches' },
      { label: 'Press', value: 'More than 25 features, 2012–2015, including The Atlanta Journal-Constitution, Southern Living, Atlanta magazine and WABE' }
    ],
    card: {
      src: 'assets/images/andover-trask-lineup-900.jpg',
      srcset: 'assets/images/andover-trask-lineup-900.jpg 900w, assets/images/andover-trask-lineup-1536.jpg 1536w',
      alt: 'Andover Trask canvas totes with leather handles and contrasting bases'
    },
    hero: {
      src: '../assets/images/andover-trask-maker-1536.jpg',
      srcset: '../assets/images/andover-trask-maker-900.jpg 900w, ../assets/images/andover-trask-maker-1536.jpg 1536w',
      alt: 'Matt Weaver stitching a canvas tote handle at an industrial sewing machine, with a finished tote behind him',
    },
    features: [
      {
        heading: 'The Standard Bag',
        variant: 'split',
        body: [
          'It started with one bag. I wanted to make bags that were handsome and functional but not pretentious, and I spent about three years on the Standard Bag before I sold one: a tote of sturdy leather and American canvas, with copper rivets. I worked by a line of Arthur Ashe’s: “Start where you are. Use what you have. Do what you can.” Part of the inspiration was my grandfather, who worked in a cobbler shop in Cedartown, Georgia.',
          'I shared my progress online, friends asked for bags of their own, and a feature in The Atlanta Journal-Constitution turned the hobby into a business. By 2015 it had become the Waxed Standard, in 20-ounce waxed canvas.'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-standard-bag-960.jpg',
            alt: 'A man carrying a Standard Bag over his shoulder: natural canvas body, olive canvas base and dark brown leather handles',
          },
          {
            src: '../assets/images/andover-trask-sewing-early-421.jpg',
            alt: 'Matt Weaver smiling at a Consew industrial sewing machine, stitching a canvas strap',
          },
          {
            src: '../assets/images/andover-trask-press-ajc-960.jpg',
            alt: 'Newspaper clipping: a photograph of a canvas tote with leather handles, captioned “Matt Weaver’s sturdy waxed canvas bags are great for weekends, work or everyday errands”',
            caption: 'The Atlanta Journal-Constitution, December 2012'
          }
        ]
      },
      {
        heading: 'Building the line',
        variant: 'catalog',
        grid: true,
        body: [
          'From the Standard Bag I built a wholesale line. By 2015 it had about ten designs in more than 20 colorways, from the Huck, a smaller everyday tote, to the Harper, a take on the classic tool bag and our most popular product with florists, stylists, artists and bartenders. Many took their names from American literature; others, like the Beaufort and the Hatteras, from Southern places. Later came the Scout, in natural canvas and natural leather: of everything we made, the closest to my vision for the brand.',
          'The materials were specified as closely as the shapes: #10 cotton duck and canvas from 14 to 22 ounces, vegetable-tanned and bridle leather, solid brass rivets and double-needle stitching. The leather came from Pennsylvania, the canvas from New England, and the machinery and sewing supplies from Georgia. Every piece carried the stamp “Andover Trask / Made in Atlanta.”'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-harper-line-960.jpg',
            alt: 'Harper tool tote: natural canvas lower with eight exterior pockets, olive canvas upper, zip closure and tan leather straps',
          },
          {
            src: '../assets/images/andover-trask-waxed-standard-960.jpg',
            alt: 'Waxed Standard tote in natural waxed canvas with a charcoal waxed base and natural leather straps',
          },
          {
            src: '../assets/images/andover-trask-huck-960.jpg',
            alt: 'Huck tote with a natural canvas upper, orange base and natural leather handles with washer details',
          },
          {
            src: '../assets/images/andover-trask-beaufort-960.jpg',
            alt: 'Beaufort tote in forest green canvas with leather shoulder straps and riveted tone-on-tone reinforcements',
          },
          {
            src: '../assets/images/andover-trask-faulkner-line-960.jpg',
            alt: 'Faulkner bag in natural canvas with a navy base and natural webbing handles',
          },
          {
            src: '../assets/images/andover-trask-hatteras-line-960.jpg',
            alt: 'Hatteras tote in gray and natural hand-woven cotton stripe with natural leather handles',
          },
          {
            src: '../assets/images/andover-trask-sawyer-960.jpg',
            alt: 'Sawyer tote with a gray canvas upper, natural canvas lower, front pocket and natural leather straps',
          },
          {
            src: '../assets/images/andover-trask-knox-960.jpg',
            alt: 'Knox tote in navy canvas with four exterior pockets and brown bridle leather handles',
          },
          {
            src: '../assets/images/andover-trask-apron-line-960.jpg',
            alt: 'Natural canvas apron with vegetable-tanned leather straps, brass hardware and four pockets',
          },
          {
            src: '../assets/images/andover-trask-scout-960.jpg',
            alt: 'Scout tote in natural canvas with natural leather handles, a leather tab across the opening and a small leather label',
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
            src: '../assets/images/andover-trask-design-wall-1536.jpg',
            alt: 'A studio wall with product sheets pinned in a row above two boards of drawings, notes and paper patterns',
            shape: 'wall'
          },
          {
            src: '../assets/images/andover-trask-workbench-1536.jpg',
            alt: 'Hand tools and a dish of brass hardware on a notebook page of measurements headed Finch, on a dark workbench',
            shape: 'bench'
          },
          {
            src: '../assets/sheets/andover-trask-drawings-2400.png',
            full: '../assets/sheets/andover-trask-drawings-4000.png',
            alt: 'Four production drawings side by side: the Finch with its three pattern pieces and measurements; the Coal Bag with a colorway table, elevations and pattern pieces; the apron outline with its pockets and leather neck strap; and a rendering of the Harper',
            caption: 'Finch, Coal Bag, apron and Harper',
            shape: 'plate'
          }
        ]
      },
      {
        heading: 'The brand',
        variant: 'brand',
        grid: true,
        body: [
          'I designed the identity myself: the monogram and wordmark, the debossed leather labels and brass branding stamp, the stationery and business cards, the website and the wholesale line sheet. I also photographed the products for the site.',
          'The brand’s line was “Carry it with you.” The copy promised goods made by hand from natural materials that wear in, each taking on its own character, with proportions drawn from storied Southern architecture. The line sheet set out each design for buyers, with its materials, dimensions and colorways.'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-mark-900.png',
            alt: 'The Andover Trask monogram, an ampersand and T in a black circle, above the wordmark',
            shape: 'mark'
          },
          {
            src: '../assets/images/andover-trask-stamp-labels-1536.jpg',
            alt: 'A brass branding stamp and debossed leather labels reading Andover Trask, Made in Atlanta',
          },
          {
            src: '../assets/images/andover-trask-business-cards-1536.jpg',
            alt: 'Two stacks of business cards: black cards with the white monogram, and white cards with the Andover Trask / Made in Atlanta wordmark',
          },
          {
            src: '../assets/images/andover-trask-brand-details-1536.jpg',
            alt: 'Canvas tote with riveted leather handles beside Andover Trask stationery, a brass stamp and hand tools',
            shape: 'wide'
          },
          {
            src: '../assets/images/andover-trask-line-sheet-cover-crop-960.jpg',
            alt: 'Cover of the Andover Trask wholesale line sheet: canvas and leather totes on a stone step in front of a carved wooden door',
          },
          {
            src: '../assets/images/andover-trask-line-sheet-harper-960.jpg',
            alt: 'Line sheet page for the Harper tool tote, with a product photograph, description and specifications',
            shape: 'print'
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
            shape: 'wide'
          },
          {
            src: '../assets/images/andover-trask-cutting-1536.jpg',
            alt: 'Matt Weaver folding canvas at a cutting table, with finished bags hanging on the wall behind him',
            shape: 'tall'
          },
          {
            src: '../assets/images/andover-trask-handle-punch-1536.jpg',
            alt: 'Hands using a rotary punch on a leather handle beside a canvas tote',
            shape: 'tall'
          },
          {
            src: '../assets/images/andover-trask-label-sewing-1200.jpg',
            alt: 'An industrial sewing machine needle stitching a small monogram label onto natural canvas',
          },
          {
            src: '../assets/images/andover-trask-boxed-orders-1200.jpg',
            alt: 'Striped canvas totes with leather handles and hang tags packed in shipping boxes',
          }
        ]
      },
      {
        heading: 'In the wild',
        variant: 'wild',
        grid: true,
        body: [
          'Andover Trask grew up alongside Instagram, which was still new when I started the brand. Photographs of the bags out in the world, carried, packed and put to work, did much of the work of introducing it, and partnerships with other businesses carried it further.',
          'West Elm also chose Andover Trask for West Elm Local, its program of goods from local makers, at its Avalon store in Alpharetta, which opened in 2014, and at its Ponce City Market store in Atlanta in 2015.'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-scout-carried-1536.jpg',
            alt: 'A woman in a white top carrying a natural canvas Scout tote over her shoulder on a tree-lined path',
          },
          {
            src: '../assets/images/andover-trask-wild-porch-1000.jpg',
            alt: 'Andover Trask totes and a Harper tool bag on a wooden table on a porch, among potted plants',
          },
          {
            src: '../assets/images/andover-trask-wild-beach-1000.jpg',
            alt: 'A brown canvas tote with leather handles on a beach beside white sneakers, with aviator sunglasses hooked on its pocket',
          },
          {
            src: '../assets/images/andover-trask-wild-alley-1000.webp',
            alt: 'A man in a white polo shirt holding up a navy and natural canvas tote in a lane between brick buildings',
          },
          {
            src: '../assets/images/andover-trask-wild-brick-1000.jpg',
            alt: 'A navy canvas tote with brown leather handles on a brick ledge in front of a brick wall',
          },
          {
            src: '../assets/images/andover-trask-wild-grey-1000.jpg',
            alt: 'A man in a chambray shirt carrying a grey and natural canvas tote with leather handles',
          },
          {
            src: '../assets/images/andover-trask-scout-table-1536.jpg',
            alt: 'A natural canvas tote with leather handles lying on a wooden table with sunglasses, a scarf and a glass of whiskey',
          },
          {
            src: '../assets/images/andover-trask-wild-sidewalk-480.jpg',
            alt: 'A navy and orange canvas tote with leather straps carried on the shoulder along a sidewalk',
          },
          {
            src: '../assets/images/andover-trask-wild-camo-1000.jpg',
            alt: 'A woman carrying a natural canvas tote with a camouflage base and leather handles',
          }
        ]
      },
      {
        heading: 'Collaborations',
        variant: 'collab',
        grid: true,
        body: [
          'I also made products with other brands. For The Bitter Southerner, I made a small batch of co-branded totes in late 2014, finished with a leather logo label and a hang tag; one run was in 24-ounce black canvas with black webbing handles. For Appointed, I designed a pair of zip pouches in 2015: a large 11-by-7-inch pouch with a zippered front pocket and a small 8-by-3-inch pouch, both lined in nylon and finished with a co-branded leather label.',
          'In 2015 we also collaborated with Ledbury, the Richmond shirtmaker.'
        ],
        images: [
          {
            src: '../assets/images/andover-trask-bitter-southerner-totes-1128.jpg',
            alt: 'A row of black canvas totes with black webbing handles, each with an Andover Trask × The Bitter Southerner hang tag',
            label: 'The Bitter Southerner',
            caption: '2014'
          },
          {
            src: '../assets/images/andover-trask-bitter-southerner-tote-960.jpg',
            alt: 'Natural canvas tote with a dark base, canvas handles, a leather label and a hang tag reading Andover Trask × The Bitter Southerner',
            shape: 'cut'
          },
          {
            src: '../assets/images/andover-trask-bitter-southerner-badge-800.jpg',
            alt: 'A vegetable-tanned leather badge debossed Andover Trask × The Bitter Southerner, Made in Atlanta, stitched to black canvas',
          },
          {
            src: '../assets/images/andover-trask-appointed-pouches-1536.jpg',
            alt: 'A man in a chambray shirt holding a stack of navy and natural canvas zip pouches against a corrugated metal wall',
            label: 'Appointed',
            caption: '2015'
          },
          {
            src: '../assets/images/andover-trask-appointed-pouch-cutout-960.jpg',
            alt: 'Navy waxed canvas pouch with two zippers, a leather zipper pull and a leather label reading Andover Trask × Appointed',
            shape: 'cut'
          },
          {
            src: '../assets/images/andover-trask-appointed-drawing-1400.png',
            alt: 'Drawing of two zip pouches with measurements: a large 11 by 7 inch top-zip pouch with a zippered front pocket, and a small 8 by 3 inch top-zip pouch, both with nylon lining',
            shape: 'print'
          }
        ]
      },
      {
        heading: 'Press and community',
        variant: 'reach',
        grid: true,
        body: [
          'Through A Book for Every Bag, each bag bought on our website paid for a new book for a child or young adult with little access to books: a fitting return for a business that began with library books.',
          'Between 2012 and 2015 the brand appeared in more than 25 publications, from The Atlanta Journal-Constitution and Southern Living’s Hot List to Atlanta magazine, Eide Magazine, UrbanDaddy and Jezebel, and I talked about the business on WABE’s City Lights.'
        ],
        quote: { text: 'Take everything to go with the all-American totes of Andover Trask.', cite: 'Atlanta Homes & Lifestyles, 2013' },
        images: [
          {
            src: '../assets/images/andover-trask-press-atlanta-page-1200.jpg',
            alt: 'Atlanta magazine Arbiter section opener headlined Totes McGoats: a striped Andover Trask Hatteras tote with two baby goats climbing out of it, on a sky-blue background',
            caption: 'Atlanta magazine, April 2014',
            shape: 'feature'
          },
          {
            src: '../assets/images/andover-trask-press-ahl-sq-960.jpg',
            alt: 'Atlanta Homes & Lifestyles style news page with a natural canvas tote under the heading Summertime Essential',
            caption: 'Atlanta Homes & Lifestyles, 2013 (product photograph updated to the Scout)',
            shape: 'print'
          },
          {
            src: '../assets/images/andover-trask-press-eide-sq-960.jpg',
            alt: 'Eide Magazine page titled Travel Like a Southerner, featuring a striped Hatteras tote',
            caption: 'Eide Magazine, Summer 2015',
            shape: 'print'
          },
          {
            src: '../assets/images/andover-trask-press-spread-sq-960.jpg',
            alt: 'An open magazine with the Harper tool tote on the left-hand page',
            shape: 'print'
          }
        ]
      }
    ],
    outcomeHeading: 'What I learned',
    outcome: [
      'I sold Andover Trask in 2015. Building it from a hobby was the broadest education I have had in making things and bringing them to market.',
      'It took craft: sewing, patterning and leatherwork, learned by hand. It took product design: drawing each bag for production and refining it through prototypes. It took brand building, from the identity to the photography and website, and business management: purchasing, bookkeeping, managing a team and selling wholesale to a national retailer. The results came in the same range, from West Elm Local and collaborations with Ledbury, The Bitter Southerner and Appointed to an interview on Atlanta’s NPR station and more than 25 features in three years.',
      'Studio and brand photographs by Sawyer Baird; Appointed pouches by Sterling Graves.'
    ]
  }
];
