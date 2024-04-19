import { fetchImages } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  renderMarkup,
  showEndOfListMessage,
  showEmptyInputMessage, // Перевірте правильність назви тут
  noImagesMessage,
} from './js/render-functions.js';

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
    showEmptyInputMessage(); // Перевірте правильність назви тут
    container.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    form.reset();
    return;
  }
  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchWord, currPage).then(data => {
      const markup = renderMarkup(data); // Перевірте правильність назви тут
      if (data.hits.length === 0) {
        noImagesMessage();
        loadMoreBtn.style.display = 'none';
        loader.style.display = 'none';
        return;
      }
      container.insertAdjacentHTML('beforeend', markup); // Перевірте правильність назви тут
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
      const markup = renderMarkup(data); // Перевірте правильність назви тут
      container.insertAdjacentHTML('beforeend', markup); // Перевірте правильність назви тут
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
