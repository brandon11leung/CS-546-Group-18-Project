import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import * as helpers from '../helpers.js';
const ntscConsoleArr = ["3DO", "Action Max", "Amiga", "Amiga CD32", "Arcadia 2001", "Atari 2600", "Atari 400", "Atari 5200", "Atari 7800", "Atari Lynx", "Atari ST", "Bally Astrocade", "CD-i", "Colecovision", "Commodore 16", "Commodore 64", "Evercade", "FM Towns Marty", "Fairchild Channel F", "Game & Watch", "Game Wave", "Game.Com", "GameBoy", "GameBoy Advance", "GameBoy Color", "Gamecube", "Gizmondo", "HyperScan", "Intellivision",  "Jaguar", "Magnavox Odyssey", "Magnavox Odyssey 2", "Magnavox Odyssey 300", "Mattel Aquarius", "Microvision", "Mini Arcade", "N-Gage", "NES", "Neo Geo", "Neo Geo AES", "Neo Geo CD", "Neo Geo Pocket Color", "Nintendo 3DS", "Nintendo 64", "Nintendo DS", "Nintendo Switch", "PC FX", "PC Games", "PSP", "Pippin", "Playstation", "Playstation 2", "Playstation 3", "Playstation 4", "Playstation 5", "Playstation Vita", "Sega 32X", "Sega CD", "Sega Dreamcast", "Sega Game Gear", "Sega Genesis", "Sega Master System", "Sega Pico", "Sega Saturn", "Sharp X68000", "Super Nintendo", "Supervision", "TI-99", "Tapwave Zodiac", "Tiger R-Zone", "TurboGrafx CD", "TurboGrafx-16", "VTech Socrates", "Vectrex", "Vic-20", "Virtual Boy", "Wii", "Wii U", "WonderSwan", "WonderSwan Color", "Xbox", "Xbox 360", "Xbox One", "Xbox Series X", "ZX Spectrum"]
const aeConsoleArr = ["Asian English Nintendo 3DS", "Asian English PSP", "Asian English Playstation 3", "Asian English Playstation 4", "Asian English Playstation 5", "Asian English Playstation Vita", "Asian English Switch"]
const jpConsoleArr = ["Famicom", "Famicom Disk System", "JP GameBoy", "JP GameBoy Advance", "JP GameBoy Color", "JP Gamecube", "JP MSX", "JP MSX2", "JP Neo Geo", "JP Neo Geo AES", "JP Neo Geo CD", "JP Neo Geo Pocket", "JP Neo Geo Pocket Color", "JP Nintendo 3DS", "JP Nintendo 64", "JP Nintendo DS", "JP Nintendo Switch", "JP PC Engine", "JP PC Engine CD", "JP PSP", "JP Playstation", "JP Playstation 2", "JP Playstation 3", "JP Playstation 4", "JP Playstation 5", "JP Playstation Vita", "JP Sega Dreamcast", "JP Sega Game Gear", "JP Sega Mark III", "JP Sega Mega CD", "JP Sega Mega Drive", "JP Sega Pico", "JP Sega Saturn", "JP Super 32X", "JP Virtual Boy", "JP Wii", "JP Wii U", "JP Xbox", "JP Xbox 360", "JP Xbox One", "JP Xbox Series X", "Super Famicom"]
const palConsoleArr = ["PAL Amiga CD32", "PAL GameBoy", "PAL GameBoy Advance", "PAL GameBoy Color", "PAL Gamecube", "PAL MSX", "PAL MSX2", "PAL Mega Drive 32X", "PAL NES", "PAL Neo Geo Pocket Color", "PAL Nintendo 3DS", "PAL Nintendo 64", "PAL Nintendo DS", "PAL Nintendo Switch", "PAL PSP", "PAL Playstation", "PAL Playstation 2", "PAL Playstation 3", "PAL Playstation 4", "PAL Playstation 5", "PAL Playstation Vita", "PAL Sega Dreamcast", "PAL Sega Game Gear", "PAL Sega Master System", "PAL Sega Mega CD", "PAL Sega Mega Drive", "PAL Sega Pico", "PAL Sega Saturn", "PAL Super Nintendo", "PAL Vectrex", "PAL Videopac G7000", "PAL Videopac G7400", "PAL Wii", "PAL Wii U", "PAL Xbox", "PAL Xbox 360", "PAL Xbox One", "PAL Xbox Series X"]
const otherConsoleArr = ["Amiibo", "Amiibo Cards", "Disney Infinity", "Dreamcast Magazine", "Electronic Gaming Monthly", "Game Informer", "GamePro", "Lego Dimensions", "MegaZone", "Nintendo Power", "PC Gamer", "Pokemon Mini", "Rumble U", "Skylanders", "Starlink", "Stoneheart", "Strategy Guide"]

export const searchByTerm = async (searchItemTerm) => {
    searchItemTerm = helpers.isValidString(searchItemTerm)
    const { data } = await axios.get(`https://www.pricecharting.com/api/products?t=${process.env.PRICECHARTING_API_KEY}&q=${searchItemTerm}`);
    let filteredArr = [];
    for (let i = 0; i < data.products.length; i++) {
        if (ntscConsoleArr.includes(data.products[i]["console-name"]) == true) {
            filteredArr.push(data.products[i]);
        }
    }
    return filteredArr;
}

export const searchByID = async (id) => {
    helpers.isValidNumber(id)
    const { data } = await axios.get(`https://www.pricecharting.com/api/products?t=${process.env.PRICECHARTING_API_KEY}&id=${id}`);
    if (data.products[0].id != id) {
        throw new Error("Error: no product was found with that id.")
    } else {
        return data;
    }
}
// console.log(await searchByTerm("pokemon pearl"));
console.log(await searchByID(38623))
