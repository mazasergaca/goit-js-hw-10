import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  infoCountry: document.querySelector('.country-info'),
  inputEl: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText(e) {
  const inputCountry = e.target.value.trim();
  clearContainer();
  if (inputCountry === '') return;

  fetchCountries(inputCountry)
    .then(response => {
      if (response.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (response.length === 1) return marcupDetailCountry(response);
      return marcupCountryList(response);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function marcupCountryList(country) {
  const marcup = country.map(x => {
    return `<li class='country-item'><img src="${x.flags.png}" alt='flag ${x.name.official}' width="70px"><p>${x.name.official}</p></li>`;
  });
  refs.listCountry.insertAdjacentHTML('beforeend', marcup.join(''));
}

function marcupDetailCountry(country) {
  const marcup = country.map(x => {
    return `<div class="info"><div class="container-info">
    <img src="${x.flags.png}" alt='flag ${x.name.official}' width="70px">
    <p>${x.name.official}</p>
  </div>
  <div>
        <span class='category'>Capital:</span><span class='value-category'>${x.capital}</span>
  </div>
  <div>
  <span class='category'>Population:</span><span class='value-category'>${x.population}</span>
  </div>
  <div>
  <span class='category'>Languages:</span><span class='value-category'>${Object.values(
    x.languages,
  )}</span>
  </div>
  </div> `;
  });
  refs.infoCountry.insertAdjacentHTML('beforeend', marcup.join(''));
}

function clearContainer() {
  refs.listCountry.innerHTML = '';
  refs.infoCountry.innerHTML = '';
}
