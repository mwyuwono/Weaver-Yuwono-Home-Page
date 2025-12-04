/**
 * Project Card Component
 * Modular component for rendering project cards
 */

/**
 * Project data structure
 * @type {Array<{title: string, location: string, pdfUrl: string, image: {src: string, srcset: string, sizes: string, alt: string}}>}
 */
const projects = [
  {
    title: 'Historic Renovation',
    location: 'Rome, GA',
    pdfUrl: '../projects/assets/pdfs/rome-renovation.pdf',
    image: {
      src: '../projects/assets/images/rome-renovation.jpg',
      srcset: '../projects/assets/images/rome-renovation-500.jpg 500w, ../projects/assets/images/rome-renovation-800.jpg 800w, ../projects/assets/images/rome-renovation.jpg 999w',
      sizes: '(max-width: 479px) 30vw, (max-width: 767px) 35vw, (max-width: 991px) 24vw, 20vw',
      alt: 'Historic Renovation'
    }
  },
  {
    title: 'Architectural Design',
    location: 'Sharon, CT',
    pdfUrl: '../projects/assets/pdfs/connecticut-cottage.pdf',
    image: {
      src: '../projects/assets/images/103smain.jpeg',
      srcset: '../projects/assets/images/103smain.jpeg',
      sizes: '(max-width: 479px) 30vw, (max-width: 767px) 35vw, (max-width: 991px) 24vw, 20vw',
      alt: 'Architectural Design'
    }
  }
];

/**
 * Creates a project card HTML element
 * @param {Object} project - Project data object
 * @returns {HTMLElement} Project card anchor element
 */
function createProjectCard(project) {
  const card = document.createElement('a');
  card.href = project.pdfUrl;
  card.target = '_blank';
  card.className = 'card project-card';
  card.setAttribute('data-element', 'card');

  // Content wrapper
  const contentWrap = document.createElement('div');
  contentWrap.className = 'card__content-wrap';

  // Content
  const content = document.createElement('div');
  content.className = 'card__content';

  // Header
  const header = document.createElement('div');
  header.className = 'card__header';

  // Title
  const title = document.createElement('div');
  title.className = 'card__title';
  title.textContent = project.title;
  title.setAttribute('data-element', 'card-title');

  // Subtitle (location or other metadata)
  const subtitle = document.createElement('div');
  subtitle.className = 'card__subtitle';
  subtitle.textContent = project.location || '';
  subtitle.setAttribute('data-element', 'card-subtitle');

  // Helper text
  const linksContainer = document.createElement('div');
  linksContainer.className = 'card__links';

  const helper = document.createElement('span');
  helper.className = 'card__link';
  helper.textContent = 'PDF download';
  helper.setAttribute('data-element', 'card-link');
  linksContainer.appendChild(helper);

  header.appendChild(title);
  header.appendChild(subtitle);
  content.appendChild(header);
  content.appendChild(linksContainer);
  contentWrap.appendChild(content);

  // Image wrapper (Flex Block)
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'card__image-wrapper';

  // Image
  const image = document.createElement('img');
  image.src = project.image.src;
  image.srcset = project.image.srcset;
  image.sizes = project.image.sizes;
  image.alt = project.image.alt;
  image.className = 'card__image';
  image.loading = 'lazy';
  image.setAttribute('data-element', 'card-image');

  imageWrapper.appendChild(image);

  card.appendChild(contentWrap);
  card.appendChild(imageWrapper);

  return card;
}

/**
 * Renders all project cards into the project grid
 * @param {HTMLElement} container - Container element to render cards into
 */
function renderProjectCards(container) {
  if (!container) {
    console.error('Project grid container not found');
    return;
  }
  
  projects.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    renderProjectCards(projectGrid);
  });
} else {
  // DOM already loaded
  const projectGrid = document.querySelector('.project-grid');
  renderProjectCards(projectGrid);
}
