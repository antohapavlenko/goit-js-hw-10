import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countriesListTemplate from './countriesListTemplate.hbs';
import countryInfoTemplate from './countryInfoTemplate.hbs';

const DEBOUNCE_DELAY = 1000;

const inputValue = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


inputValue.addEventListener('input', debounce(getValue, DEBOUNCE_DELAY))


function getValue(event) {
    event.preventDefault()
    
    const getValue = event.target.value.trim()

    if (getValue.length === 1) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
    }

    fetchCountries(getValue)
    .then(value => {
        if (!value) {
            return Notify.info('Please enter any character');
        }

        if (value.length > 10) {
            return Notify.failure('Oops, there is no country with that name.');
        }
        parseValue(value)
    })
    .catch(error => {
        alert(error)})
}

function parseValue(result) {
    countryInfo.innerHTML = ""
    countriesList.innerHTML = ""

   if (result.length === 1) {
    countryInfo.innerHTML = countryInfoTemplate(result)
   } else {
    countriesList.innerHTML = countriesListTemplate(result)
   }
}