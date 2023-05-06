// import { searchByTerm } from '../../utils/pricecharting.js';
// import * as charting from '../utils/pricecharting.js'

const validString = (str) => {
    if (typeof str !== 'string') { return false; }
    str = str.trim();
    if (str.length === 0) { return false; }
    return true;
}

let form = document.getElementById('search-form');
let search = document.getElementById('searchInput');
let errorSearch= document.getElementById('errorSearch');

if (form) {
    form.addEventListener('submit', async (event) => {
        try {
        validString(search.value);
        errorSearch.hidden = true;
        } catch (error) {
            event.preventDefault();
            errorSearch.hidden = false;
            errorSearch.innerHTML = 'Search input must be a valid string.';
        }
        
    }
)};