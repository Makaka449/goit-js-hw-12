import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captions: true,
  captionsData: 'alt',
  captionDelay: 150,
});

const form = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');
let searchWord = '';
let currPage;

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  currPage = 1;
  event.preventDefault();
  container.innerHTML = '';
  searchWord = form.elements.searchWord.value.trim();
  loadMoreBtn.style.display = 'block';

  if (searchWord === '') {
    showEmptyInputMessage();
    container.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    form.reset();
    return;
  }
  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchWord, currPage).then(data => {
      const marcup = renderMarcup(data);
      if (data.hits.length === 0) {
        noImagesMessage();
        loadMoreBtn.style.display = 'none';
        loader.style.display = 'none';
        return;
      }
      container.insertAdjacentHTML('beforeend', marcup);
      lightbox.refresh();
      loader.style.display = 'none';
    });
  } catch (error) {
    console.error('Error:', error);
  }
  form.reset();
}

async function onLoadMore() {
  currPage += 1;
  try {
    const images = await fetchImages(searchWord, currPage).then(data => {
      const marcup = renderMarcup(data);
      container.insertAdjacentHTML('beforeend', marcup);
      lightbox.refresh();

      const cardHeight = container.getBoundingClientRect().height;
      window.scrollBy({
        top: 2 * cardHeight,
        behavior: 'smooth',
      });

      if (data.hits.length <= 14) {
        loadMoreBtn.style.display = 'none';
        showEndOfListMessage();
        lightbox.refresh();
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchImages(searchWord, currPage) {
  const KEY = '43280076-efaf032a147c4a401dc5ab87e';
  const URL = 'https://pixabay.com/api/';
  const resp = await axios.get(URL, {
    params: {
      key: KEY,
      q: searchWord,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currPage,
      per_page: 15,
    },
  });
  return resp.data;
}

function renderMarcup(data) {
  return data.hits
    .map(
      el =>
        `<div class="gallery-item">
            <a class="gallery-link" href="${el.largeImageURL}">
                <img class="gallery-image" src="${el.webformatURL}" alt="${el.tags}" />
            </a>
            <div class="gallery-item-info">
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Likes: <span>${el.likes}</span>
                    </span>
                </p>
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Views: <span>${el.views}</span>
                    </span>
                </p>
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Comments: <span>${el.comments}</span>
                    </span>
                </p>
                <p class="gallery-item-info-par">
                    <span class="gallery-item-info-span">Downloads: <span>${el.downloads}</span>
                    </span>
                </p>
            </div>
        </div>`
    )
    .join('');
}

function showEndOfListMessage() {
  iziToast.info({
    timeout: 3000,
    position: 'topRight',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

function showEmptyInputMessage() {
  iziToast.info({
    timeout: 3000,
    position: 'topRight',
    message: "The search query can not be empty!",
  });
}

function noImagesMessage() {
  iziToast.error({
    timeout: 3000,
    position: 'topRight',
    message:
      'There are no images matching your search query. Please, enter something else!',
  });
}

