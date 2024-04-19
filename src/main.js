import { fetchImages } from './js/pixabay-api';
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
  event.preventDefault();
  currPage = 1;
  container.innerHTML = '';
  searchWord = form.elements.searchWord.value.trim();
  loadMoreBtn.style.display = 'block';

  if (searchWord === '') {
    iziToast.error({ message: 'Please enter a search keyword' });
    return;
  }

  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchWord, currPage);
    const marcup = renderMarcup(images);
    if (images.hits.length === 0) {
      iziToast.warning({ message: 'No images found for your search query' });
      loadMoreBtn.style.display = 'none';
    } else {
      container.insertAdjacentHTML('beforeend', marcup);
      lightbox.refresh();
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({ message: 'An error occurred while fetching images' });
  } finally {
    loader.style.display = 'none';
  }

  form.reset();
}

async function onLoadMore() {
  currPage += 1;
  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchWord, currPage);
    const marcup = renderMarcup(images);
    container.insertAdjacentHTML('beforeend', marcup);
    lightbox.refresh();

    const cardHeight = container.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth',
    });

    if (images.hits.length <= 14) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({ message: 'End of the list' });
      lightbox.refresh();
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loader.style.display = 'none';
  }
}
