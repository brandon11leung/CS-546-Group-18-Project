// import { searchByTerm } from '../../utils/pricecharting.js';
// import * as charting from '../utils/pricecharting.js'

const validString = (str) => {
    if (typeof str !== 'string') { return false; }
    str = str.trim();
    if (str.length === 0) { return false; }
    return true;
}
const validType = (typ) => {

    const typArray = ['Buy', 'Sell'];
    //Check state
    if (!typArray.includes(typ)) { return false; }

    return true;
 
}

let form = document.getElementById('search-form');
let search = document.getElementById('searchInput');
let listingTypeInput = document.getElementById('listingTypeInput');
let errorSearch= document.getElementById('errorSearch');

if (form) {
    form.addEventListener('submit', async (event) => {
        if (!validType(listingType.value)) {
            event.preventDefault();
            errorType.hidden = false;
            errorType.innerHTML = 'Type must be either a Buying or Selling listing.';
        }
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