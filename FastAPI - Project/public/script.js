const photosList = document.getElementById('photos');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const perPage = 50;
let currentPage = 1;
let totalPages = 1;

const displayPhotos = () => {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const photosToDisplay = photos.slice(startIndex, endIndex);

  photosList.innerHTML = '';

  photosToDisplay.forEach(photo => {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    image.src = photo.thumbnailUrl;
    image.alt = photo.title;
    listItem.appendChild(image);
    photosList.appendChild(listItem);
  });

  updatePagination();
};

const updatePagination = () => {
  const totalPages = Math.ceil(photos.length / perPage);

  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage === totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
};

// Fetch photos data from the API
fetch('/api/photos')
  .then(response => response.json())
  .then(photosData => {
    photos = photosData;
    totalPages = Math.ceil(photos.length / perPage);

    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayPhotos();
      }
    });

    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayPhotos();
      }
    });

    displayPhotos();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
