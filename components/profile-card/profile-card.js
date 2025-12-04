/**
 * Profile Card Component
 * Modular component for rendering profile cards
 */

/**
 * Profile data structure
 * @type {Array<{name: string, company: string, linkedInUrl: string, projectsUrl: string|null, image: {src: string, alt: string}}>}
 */
const profiles = [
  {
    name: 'Stanton',
    company: 'Mercer',
    linkedInUrl: 'https://www.linkedin.com/in/stantonyuwono/',
    projectsUrl: null,
    image: {
      src: 'landing-assets/stanton-headshot.jpg',
      alt: 'Stanton Yuwono'
    }
  },
  {
    name: 'Matt',
    company: 'McKinsey & Company',
    linkedInUrl: 'https://www.linkedin.com/in/mattweaveryuwono/',
    projectsUrl: '/projects/',
    image: {
      src: 'landing-assets/matt-headshot.jpg',
      alt: 'Matt Weaver Yuwono'
    }
  }
];

/**
 * Creates a profile card HTML element
 * @param {Object} profile - Profile data object
 * @returns {HTMLElement} Profile card div element
 */
function createProfileCard(profile) {
  const card = document.createElement('div');
  card.className = 'card profile-card';
  card.setAttribute('data-element', 'profile-card');
  card.setAttribute('data-profile-id', profile.name.toLowerCase());

  // Content wrapper
  const contentWrap = document.createElement('div');
  contentWrap.className = 'card__content-wrap';

  // Content
  const content = document.createElement('div');
  content.className = 'card__content';

  // Header
  const header = document.createElement('div');
  header.className = 'card__header';

  // Title (name)
  const title = document.createElement('div');
  title.className = 'card__title';
  title.textContent = profile.name;
  title.setAttribute('data-element', 'card-title');
  title.setAttribute('data-profile-id', profile.name.toLowerCase());

  // Subtitle (company)
  const subtitle = document.createElement('div');
  subtitle.className = 'card__subtitle';
  subtitle.textContent = profile.company;
  subtitle.setAttribute('data-element', 'card-subtitle');
  subtitle.setAttribute('data-profile-id', profile.name.toLowerCase());

  // Links container
  const linksContainer = document.createElement('div');
  linksContainer.className = 'profile-card__links';

  // Projects link (if applicable)
  if (profile.projectsUrl) {
    const projectsLink = document.createElement('a');
    projectsLink.href = profile.projectsUrl;
    projectsLink.className = 'profile-card__link';
    projectsLink.textContent = 'Projects';
    projectsLink.setAttribute('data-element', 'card-link');
    linksContainer.appendChild(projectsLink);
  }

  // LinkedIn link
  const linkedInLink = document.createElement('a');
  linkedInLink.href = profile.linkedInUrl;
  linkedInLink.target = '_blank';
  linkedInLink.rel = 'noopener noreferrer';
  linkedInLink.className = 'profile-card__link';
  linkedInLink.textContent = 'Linked-In';
  linkedInLink.setAttribute('data-element', 'card-link');
  linksContainer.appendChild(linkedInLink);

  header.appendChild(title);
  header.appendChild(subtitle);
  content.appendChild(header);
  content.appendChild(linksContainer);
  contentWrap.appendChild(content);

  // Image wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'card__image-wrapper';

  // Image
  const image = document.createElement('img');
  image.src = profile.image.src;
  image.alt = profile.image.alt;
  image.className = 'card__image';
  image.loading = 'lazy';
  image.setAttribute('data-element', 'card-image');
  image.setAttribute('data-profile-id', profile.name.toLowerCase());

  imageWrapper.appendChild(image);

  card.appendChild(contentWrap);
  card.appendChild(imageWrapper);

  return card;
}

/**
 * Renders all profile cards into the profile grid
 * @param {HTMLElement} container - Container element to render cards into
 */
function renderProfileCards(container) {
  if (!container) {
    console.error('Profile grid container not found');
    return;
  }

  profiles.forEach(profile => {
    const card = createProfileCard(profile);
    container.appendChild(card);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const profileGrid = document.querySelector('.profile-grid');
    renderProfileCards(profileGrid);
  });
} else {
  // DOM already loaded
  const profileGrid = document.querySelector('.profile-grid');
  renderProfileCards(profileGrid);
}
