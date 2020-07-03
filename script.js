const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let photosArray = [];
let count = 5;
let imagesLoaded = 0;
const API_KEY = 'hzos6_KWwt8qTJCDPwey4b2wB7vMIH5OPlTviGLMans';
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

// Fetch photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    photosArray = data;
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

// Render photos
const displayPhotos = () => {
  imagesLoaded = 0;

  photosArray.forEach(photo => {
    // Create <a> tag
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // Create img element
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

function imageLoaded() {
  imagesLoaded++;
  console.log('images loaded');
  if (imagesLoaded === photosArray.length) {
    ready = true;
    loader.hidden = true;
    count = 30;
    console.log('ready = ', ready);
  }
}

/**
 * Helper function to set multiple
 * attributes of an element like <a> and <img>
 * Ex: src from <img> and href for <a>
 */
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
