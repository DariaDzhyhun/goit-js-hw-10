import './css/styles.css';
import debounce from 'lodash.debounce';
import renderCountry from './templates/renderCountry.hbs';
import renderList from './templates/renderList.hbs';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  clear();
  if (!e.target.value) {
    return;
  }
  const name = e.target.value.trim();
  fetchCountries(name)
    .then(checkData)

    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function checkData(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if ((data.length <= 10) & (data.length > 1)) {
    countryList.innerHTML = renderList({ data });
  }
  if (data.length === 1) {
    countryInfo.innerHTML = renderCountry({ data });
  }
}

function clear() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
