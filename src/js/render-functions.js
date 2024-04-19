import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderMarcup(data) {
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

export function showEndOfListMessage() {
  iziToast.info({
    timeout: 3000,
    position: 'topRight',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

export function showEmptyInputMessage() {
  iziToast.info({
    timeout: 3000,
    position: 'topRight',
    message: "The search query can not be epty!",
  });
}

export function noImagesMessage() {
  iziToast.error({
    timeout: 3000,
    position: 'topRight',
    message:
      'There are no images matching your search query. Please, enter something else!',
  });
}