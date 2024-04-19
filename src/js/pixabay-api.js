import axios from 'axios';

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