
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import * as users from './data/users.js';
import * as listings from './data/listings.js';
import * as reviews from './data/reviews.js';
import * as comments from './data/comments.js';
import * as offers from './data/offers.js';
import * as transactions from './data/transactions.js';

const db = await dbConnection();
await db.dropDatabase();

console.log("\n---MISSING PARAMETERS---\n")
try {
    const noParams = await users.createUser();
} catch (e) {
    console.log(e.message);
}

console.log("\n---INVALID FIRST NAME---\n");

try {
    const badFirstName1 = await users.createUser("Luke1", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badFirstName2 = await users.createUser("Luke*", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badFirstName3 = await users.createUser("L", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}


try {
    const badFirstName4 = await users.createUser("dwgihrefdsgiewhosdiegdfshouewdfsihodfiewoei", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badFirstName5 = await users.createUser("     ", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

console.log("\n---INVALID LAST NAME---\n");

try {
    const badLastName1 = await users.createUser("Luke", "Muhnicky1", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badLastName2 = await users.createUser("Luke", "Muhnicky*", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badLastName3 = await users.createUser("Luke", "dhiowjefdihweoqahkrouiehkwrljodfsiewhkjlodsui", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badLastName4 = await users.createUser("Luke", "     ", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badLastName5 = await users.createUser("Luke", "M", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

console.log("\n---INVALID EMAIL---\n");


try {
    const badEmail1 = await users.createUser("Luke", "Muhnicky", "lmuhnickstevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badEmail2 = await users.createUser("Luke", "Muhnicky", "lmuhnick@ stevens.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badEmail3 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.luk", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badEmail4 = await users.createUser("Luke", "Muhnicky", "lmuhnick@.edu", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badEmail5 = await users.createUser("Luke", "Muhnicky", "@.com", "LukeM602", "2002-06-02", "Stevens100", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

console.log("\n---BAD PASSWORD---\n");


try {
    const badPassword1 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badPassword2 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", " Stevens12 *", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badPassword3 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "stevens12*", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badPassword4 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "stevens**", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badPassword5 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "    Stevens123   ", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}


console.log("\n---INVALID USERNAME---\n");

try {
    const badUsername1 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM", "2002-06-02", "Stevens997*", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const badUsername2 = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "   LukeM 602   ", "2002-06-02", "Stevens997*", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

console.log("\n---INVALID DOB---\n");

try {
    const tooOld = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "1922-05-02", "Stevens997*", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const tooYoung = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2005-05-31", "Stevens997*", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

try {
    const wrongFormat = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002/06/02", "Stevens997*", "Cranford", "NJ");
} catch (e) {
    console.log(e.message);
}

console.log("\n---INVALID CITY---\n");

try {
    const numberCity = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford1", "NJ");
} catch (e) {
    console.log(e.message);
} 


try {
    const symbolCity = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford*", "NJ");
} catch (e) {
    console.log(e.message);
} 


console.log("\n---INVALID STATE---\n");

/* Invalid state */

try {
    const fullState = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford", "New Jersey");
} catch (e) {
    console.log(e.message);
}

try {
    const numberState = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford", "12");
} catch (e) {
    console.log(e.message);
}

try {
    const fakeState = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford", "NN");
} catch (e) {
    console.log(e.message);
}


console.log("\n---END OF PARAMETER CHECKING FOR CREATE USER---\n");
console.log("\n---BEGINNING SEEDING PROCESS FOR CREATE USER---\n");


const luke = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford", "NJ");
const patrick = await users.createUser(" Patrick    ", " Hill ", " phill@stevens.edu", " phill1 ", "1975-01-01", "1ErrorCheck!", "Vernon", "NJ");
const ark = await users.createUser("Arkansas", "Apprentice", "aapp1123@gmail.com", " arkman", "2004-02-06", "passWord'56", "Little Rock", "AR");
const mrKing = await users.createUser("mister", "king", " 1coolkid!@gmail.com", " notanarcissist1 ", "2002-04-29", "'yeehaW123", "San Francisco " , "CA");
const gamer = await users.createUser("   gamer    ", "man", "      PHILLISTHEBEST@STEVENS.EDU   ", "games4thwin", "1954-04-29", "i<3Hilll", "    Des Moines  ", "IA");
console.log("Total users added: 5");
const albertEinstein = await users.createUser(" albert   ", " einstein ", " 1einstein1@yahoo.com ", " Einstein ", "1924-01-01", "The*Genius123", " jackson  ", "    ms   ");
const handymanny = await users.createUser("    Handy    ", " Manny   ", "  h@m.net", "handymanny", "1982-01-01", "i%T12ool", "  san antonio ", "   tx   ");
const trickyUser = await users.createUser(" tRiCksTeR    ", " uSeR ", " TRICKY@Stevens.edu", " Trickshot12345678910 ", "2004-12-31", "T3094dwkj2()", "Anchorage", "AK");
const alien = await users.createUser("Zeep", "Zorp", "123zorp1@yes.org", "Beep12", "1970-11-22", "oiei32@(!H", "Reno", "NV");
const finalUser = await users.createUser("Barack", "Obama", "presidentobama@something.mil", "ObamaMama<3", "1961-08-04", "Obama804*", "Honolulu", "HI");
console.log("Total users added: 10");
const echo = await users.createUser("Edward", "Cho", "echo@stevens.edu", "Echo11", "1997-11-21", "Dainsleif8&", "New York", "NY");
const raye = await users.createUser("Ilse", "Katarn", "rikatarn11@gmail.com", "Raye01", "2001-01-01", "trashCans1!!", "Miami", "FL");
const modkop = await users.createUser("Brandon", "Leung", "bleu@gmail.com", "Modkop", "2002-11-12", "MudkipWithAGun2002[]", "Staten Island", "NY");
const arthur = await users.createUser("Tacitus", "Kilgore", "kgilgore@eyefind.com", "Fenton", "1963-02-22", "HeyThereMister!!!1899", "Philadelphia", "PA");
const sasha = await users.createUser("Sasha", "Braus", "sbraus@paradise.com", "PotatoGirl", "2000-07-26", "104Cadets:D", "Dauper", "SC");
console.log("Total users added: 15"); 


console.log("\n---ALL USERS ADDED---\n");

console.log("\n---ATTEMPTS TO DUPLICATE USERNAMES AND EMAIL ADDRESSES---\n");


try {
    const lukeFraud = console.log(await users.createUser("Luke", "Muhnicky", " LMUHNICK@STEVENS.EDU ", "DifferentName!", "2002-06-02", "Stevens997*", "Cranford", "NJ"));
} catch (e) {
    console.log(e.message);
}


try {
    const sameUsername = console.log(await users.createUser("Trickster", "User", " Tricky@gmail.com ", "   trickshot12345678910", "2004-12-31", "We0123$!", "Anchorage", "AK"));
} catch (e) {
    console.log(e.message);
}


console.log("\n---CHECKUSER ERROR CHECKING---\n");


try {
    const noParam = await users.checkUser();
} catch (e) {
    console.log(e.message);
}



try {
    const wrongParams = await users.checkUser(123, 456);
} catch (e) {
    console.log(e.message);
}


try {
    const wrongEmail = await users.checkUser("lmuhnickk@stevens.edu", "Stevens997*");
} catch (e) {
    console.log(e.message);
}

try {
    const wrongPassword = await users.checkUser("lmuhnick@stevens.edu", "Stevens996*");
} catch (e) {
    console.log(e.message);
}


try {
    const validUser = console.log(await users.checkUser("  LMUHNICK@STEVENS.EDU   ", "Stevens997*"))
} catch (e) {
    console.log(e.message);
}

console.log("\n---INSERTING INVALID LISTINGS---\n");

try {
    const noParamListings = await listings.create();
} catch (e) {
    console.log(e.message);
}

try {
    const missingGameName = await listings.create(patrick._id.toString(), "Sell", "Used", ["Cartridge", "Case", "Manual"], 240, ["http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/reerc8i3tjznvmqhlqjs.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/oemwvopsiu2iimargiyo.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/egxvogoclhmgy8wj5imd.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/c9s0cvrpziyqofisaltb.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157470/rjkgsuh7hl0g6gztaubj.jpg"], ["Pokemon HeartGold Loose", "Pokemon HeartGold CIB"], 10, ["USPS Priority"], "Good and clean copy, tested working, refer to images for condition.", "No returns", "USD", 38623)
} catch (e) {
    console.log(e.message);
}

try {
    const noSecondaryCondition = await listings.create(mrKing._id.toString(), "Breath of the Wild", "Sell", "Used",  ['Cartridge'], ["http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/reerc8i3tjznvmqhlqjs.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/oemwvopsiu2iimargiyo.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/egxvogoclhmgy8wj5imd.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/c9s0cvrpziyqofisaltb.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157470/rjkgsuh7hl0g6gztaubj.jpg"], ["Pokemon HeartGold Loose", "Pokemon HeartGold CIB"], 10, ["USPS Priority"], "Good and clean copy, tested working, refer to images for condition.", "No returns", "USD", 38623)
} catch (e) {
    console.log(e.message);
}



console.log("\n\n-----INSERTING LISTINGS------\n\n");


const validListing1 = await listings.create(luke._id.toString(), "Mario Kart 8 Deluxe", "Buy", "New", ["Cartridge", "Case"], 60, ['https://i.ebayimg.com/images/g/-~gAAOSw8-lgZNLn/s-l500.jpg'], [], 0, "Shipping", "Comes with case", "30 Day Returns (Buyer pays for return shipping)", "USD", 32913);
const validListing2 = await listings.create(ark._id.toString(), "Splatoon", "Sell", "Used", ["Disc", "Case"], 17, ['https://i.ebayimg.com/images/g/2dIAAOSwxVRkVFXi/s-l1600.jpg', 'https://i.ebayimg.com/images/g/O7wAAOSwHS5kVFXj/s-l1600.jpg'], [], 2.99, "Shipping", "Has a scratch but otherwise in good condition", "No Returns", "USD", 32913);
const validListing3 = await listings.create(mrKing._id.toString(), "Star Wars Dark Forces", "Buy", "Used", ["Disc"], 12, ['https://i.ebayimg.com/images/g/EzQAAOSwmxFkVp-e/s-l1600.jpg'], [], 5, "Shipping", "i only want the disk", "30 Day Returns (Buyer pays for return shipping)", "USD", 32913);
const validListing4 = await listings.create(handymanny._id.toString(), "Super Mario All Stars + Super Mario World", "Buy", "Used", ["Case"], 14, ['https://i.ebayimg.com/images/g/fw4AAOSwVjhjkoH9/s-l1600.jpg'], [], 0, "Shipping", "Just need the case, and bam! My collection will be complete.", "No Returns", "USD", 32913);
const validListing5 = await listings.create(alien._id.toString(), "Halo 2", "Sell", "Used", ["Case", "Disc", "Manual"], 12, ['https://i.ebayimg.com/images/g/05MAAOSwl8xkRJrr/s-l1600.jpg', 'https://i.ebayimg.com/images/g/~DIAAOSw~JhkRJrx/s-l1600.jpg', 'https://i.ebayimg.com/images/g/CE8AAOSwY6dkRJr2/s-l1600.jpg'], [], 7, "Shipping", "Complete in box - perfect for collectors.", "30 Day Returns (Buyer pays for return shipping)", "USD", 32913);
const validListing6 = await listings.create(luke._id.toString(), "Goldeneye 007", "Buy", "Used", ["Cartridge"], 21, ['https://i.ebayimg.com/images/g/9I0AAOSwc0lj4LXa/s-l1600.jpg'], [], 0, "Shipping", "Cartridge. Nothing more.", "60 Day Returns (Buyer pays for return shipping)", "USD", 32913);
const validListing7 = await listings.create(luke._id.toString(), "Wii Sports Resort", "Sell", "New", ["Disc", "Case"], 56, ['https://i.ebayimg.com/images/g/neIAAOSwq69kUsZ4/s-l1600.jpg', 'https://i.ebayimg.com/images/g/YfMAAOSwI6tkUsaL/s-l1600.jpg'], [], 0, "Shipping", "Huge nostalgia rush! Deal of a lifetime.", "90 Day Returns (Buyer pays for return shipping)", "USD", 32913);


try {

    const soulsilver = await listings.create(modkop._id, "Pokemon Soulsilver Big Box CIB", "Sell", "Used", ["Cartridge", "Manual", "Case", "Outer Box", "Other"], 250, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431639/orkbvk22sxozt4uulzwa.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431639/cv0tmqgdfcrtxfxkdgzs.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431640/iqnrslkdmuznagvt9wvs.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431640/jw8cy3dbw6l5x3knrpzw.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431641/lrrplymhfcrlxpvfoydk.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431642/iujwrm2ubshupbqxr3ul.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431642/xi23xkxkzkv8uxdm1a6p.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431642/dcwpnrl8whlrvezvcxgh.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431643/bn3n5smryhffx9wlnhmj.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431643/aqeeryu6t7us98xmqtro.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431644/vp9gljsgu0ykbpj3ynfm.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431644/o0zenf0yo9tyu2yocjp4.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431645/domrfpqjtdiumtxjm1y1.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431645/ighqhby9ri5hyd80ohfn.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431646/ouzozdoc5uxk2q3c5grw.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431646/o2z4mqptpvpmcy09p94o.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431647/pebylwmy1bgykzswvusw.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431647/vhxqenyhjnurcjexljiq.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431648/qdm4fjwmprh50jxfb990.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431648/il5yvhwdjda2vnnelop9.jpg'
    ], ["Rhythm Thief & the Emperors Treasure"], 10, "Both Shipping and Local Meetup", "Comes with Pokewalker (no battery), though I am willing to lower the price by 50 if you do not want the Pokewalker. Please refer to the pictures for the condition, but the game is confirmed to work.", "No Returns", "USD", 38623);

    const emerald = await listings.create(echo._id, "Pokemon Emerald Loose", "Sell", "Used", ["Cartridge"], 185, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431653/semr8q1er31f0lpktfri.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431654/wnlsxvf5u2gquzx86g4d.jpg'
    ], ["Pokemon Emerald"], 0, "Both Shipping and Local Meetup", "Looking to sell or trade this copy of Pokemon Emerald for money or Pokemon Emerald with a factory code of 11 E3. Please comment if you have any questions. Thanks!", "No Returns", "USD", 2455);

    const pearl = await listings.create(raye._id, "Pokemon Pearl Loose", "Sell", "Used", ["Cartridge"], 40, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431650/tnhc834bvs5wffhdzfmw.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431651/rydmmleil0udktg13x81.jpg'
    ], [], 5, "Shipping", "Confirmed to be working. Please refer to images for condition.", "30 Day Returns (Buyer pays for return shipping)", "USD", 4124);

    const kidIcarus = await listings.create(modkop._id, "Kid Icarus Uprising Loose", "Sell", "Used", ["Cartridge"], 70, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431649/x3bdusvejfwblnqexitx.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431649/riy3bl1etortdrtkrk6n.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Confirmed to be working. Please refer to images for condition.", "No Returns", "USD", 32655);

    const spiritTracks = await listings.create(sasha._id, "The Legend of Zelda: Spirit Tracks Loose", "Sell", "Used", ["Cartridge"], 35, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431652/cwleofyf77gxl3nplzhj.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431652/cpnt7ofwymibkglbt2ew.jpg'
    ], [], 0, "Local Meetup", "Should still work. Don't have a DS to test it.", "60 Day Returns (Buyer pays for return shipping)", "USD", 20109);

    const superMetroid = await listings.create(arthur._id, "Super Metroid Loose", "Sell", "Used", ["Cartridge"], 100, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431654/mmrhbj4r3tnyoinawkk3.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431655/mskcmasrcbxf0bxqkbhz.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431655/s4lqli5zua0fpc4vnh7u.jpg'
    ], [], 0, "Shipping", "Super Metroid Loose", "No Returns", "USD", 7143);

    const battlefront = await listings.create(echo._id, "Star Wars Battlefront II Greatest Hits PSP CIB", "Sell", "Used", ["Disc", "Box", "Manual"], 20, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431656/qbqqinb0qvyerjghpdgo.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431656/fxoa0kjhx89bpirjlbvu.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431657/dcbt06yngkdfte123pas.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431657/ajg20qtmylyklod8xnsx.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431658/ytrjt1tqizmoir1vmhpm.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431658/accy0arugkuwaunfe38f.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431659/hkjutbfifizcldpuvhzf.jpg'
    ], ["Metal Gear Solid: Peacewalker"], 5, "Both Shipping and Local Meetup", "Disc is in rough shape but still works.", "No Returns", "USD", 3232477);

    const threeDS = await listings.create(modkop._id, "Nintendo 3DS Aqua Blue", "Sell", "Used", ["Console"], 125, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431659/uglqyfmeigzxreqqm6uu.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431660/uleyglenjtx36l0palp2.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431660/o025r4vc2ighzsfjqcgy.jpg'
    ], ["Attack on Titan 2: Final Battle Switch"], 0, "Both Shipping and Local Meetup", "Console does work. Includes stylus. Will be factory reset.", "No Returns", "USD", 31254);

    const attackOnTitan = await listings.create(modkop._id, "Attack on Titan 2: Final Battle for Switch", "Buy", "New", ["Box", "Cartridge"], 85, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431661/b03pljnaafokjgnywnmo.jpg'
    ], ["3DS Aqua Blue"], 0, "Both Shipping and Local Meetup", "Looking for AOT Final Battle, either new or CIB.", "60 Day Returns (Buyer pays for return shipping)", "USD", 61002);

    const white2 = await listings.create(modkop._id, "Pokemon White 2 Box and Manual", "Buy", "Used", ["Box", "Manual"], 25, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683445726/hrxghym9jyqw9leqbrz7.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "I own the cartridge, just trying to make it CIB. Thanks.", "30 Day Returns (Buyer pays for return shipping)", "USD", 33362);

    const fossilLeague = await listings.create(modkop._id, "Fossil League CIB", "Buy", "Used", ["Cartridge", "Box", "Manual"], 20, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431662/yq7ko38w5gzip71h9cgs.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Looking for a clean copy. Thanks.", "30 Day Returns (Buyer pays for return shipping)", "USD", 11811);

    const marioKart8Deluxe = await listings.create(raye._id, "Mario Kart 8 Deluxe", "Buy", "New", ["Cartridge", "Box"], 50, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431662/nc4pli1uw20xtd0olr2b.jpg'
    ], [], 0, "Local Meetup", "Mario Kart 8 Deluxe", "30 Day Returns (Buyer pays for return shipping)", "USD", 37433);

    const n64JungleGreen = await listings.create(echo._id, "Nintendo N64 Jungle Green", "Buy", "Used", ["Console", "Controller"], 165, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431663/u08co8d0ml3dyxiep4cp.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Looking for a good condition console. Thanks.", "60 Day Returns (Seller pays for return shipping)", "USD", 3689);

    const pokemonConquest = await listings.create(sasha._id, "Pokemon Conquest CIB", "Buy", "Used", ["Cartridge", "Box", "Manual"], 85, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431663/wfeazz1kupfcudvazdmp.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Looking for a good condition copy. Thanks.", "90 Day Returns (Buyer pays for return shipping)", "USD", 32859);

    const pokemonCrystal = await listings.create(modkop._id, "Pokemon Crystal Loose", "Buy", "Used", ["Cartridge"], 100, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431664/fgp2kdhk5xddx7wdjzn2.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Looking for a good condition copy. Thanks.", "30 Day Returns (Buyer pays for return shipping)", "USD", 2980);

    const rhythmThief = await listings.create(sasha._id, "Rhythm Thief & the Emperor's Treasure", "Buy", "Used", ["Cartridge", "Box", "Manual"], 220, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431664/ff0brdf5zipw6f4maomw.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Looking for a good condition copy. Thanks.", "30 Day Returns (Buyer pays for return shipping)", "USD", 32913);

    const republicCommando = await listings.create(modkop._id, "Star Wars Republic Commando Collectors Edition for Switch", "Buy", "New", ["Cartridge", "Box", "Manual", "Other"], 90, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683431664/y2ur0b5to4mgak2szgnc.jpg'
    ], [], 0, "Both Shipping and Local Meetup", "Looking for a new copy of this. Thanks.", "No Returns", "USD", 2183061);
   
    const firered = await listings.create(echo._id, "Pokemon Firered Loose", "Sell", "Used", ["Cartridge"], 120, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683656815/fatqyrie3npy39qmxyoh.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683656816/nfhkuhdyegepfiwoh1no.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683656817/kiljmwbhlbv1jdxzjqij.jpg',
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683656817/yd3bmjcr9zd2dles1o0f.jpg'
    ], ["Pokemon Crystal"], 0, "Both Shipping and Local Meetup", "Tested and works.", "60 Day Returns (Seller pays for return shipping)", "USD", 2456);

    const explorersOfSky = await listings.create(sasha._id, "Pokemon Mystery Dungeon: Explorers of Sky", "Buy", "Used", ["Cartridge", "Box", "Manual"], 145, [
        'http://res.cloudinary.com/joystick-junction/image/upload/v1683657046/nvtpj2zwytqdwzkiomwj.jpg'
    ], [], 0, "Shipping", "Looking for clean copy of this to replay.", "30 Day Returns (Buyer pays for return shipping)", "USD", 19755);


} catch (e) {
    console.log(e.message)
}


console.log("\n\n-----INSERTING INVALID COMMENTS------\n\n");


try {
    const noParams = await comments.createComment();
} catch (e) {
    console.log(e.message);
}

try {
    const badId = await comments.createComment(validListing4._id.toString(), '100', "I'm going to try and break this");
} catch (e) {
    console.log(e.message);
}

console.log("\n\n-----INSERTING TRANSACTIONS-----\n\n");

try {
    const goodTransaction = await (transactions.createTransaction(validListing5._id.toString(), luke._id.toString()));
    console.log(goodTransaction);
} catch(e) {
    console.log(e.message);
}

try {
    const buyItAgain = await (transactions.createTransaction(validListing5._id.toString(), luke._id.toString()));
    console.log(buyItAgain);
} catch(e) {
    console.log(e.message);
}

try {
    const goodTransaction2 = await (transactions.createTransaction(validListing6._id.toString(), mrKing._id.toString()));
    console.log(goodTransaction2);
} catch (e) {
    console.log(e.message);
}

try {
    const goodTransaction3 = await (transactions.createTransaction(validListing2._id.toString(), albertEinstein._id.toString()));
    console.log(goodTransaction3);
} catch (e) {
    console.log(e.message);
}

try {
    const myOwnListing = await (transactions.createTransaction(validListing7._id.toString(), luke._id.toString()));
    console.log('This should NOT print.');
} catch (e) {
    console.log(e.message);
}




console.log('\n---INSERTING INVALID REVIEWS---\n')

try {
    const personalGrudge = await reviews.createReview(mrKing._id.toString(), alien._id.toString(), 'I have a personal grudge against you, so I will give you a bad review.', 1);
} catch (e) {
    console.log(e.message);
}

try {
    const biggestFan = await reviews.createReview(patrick._id.toString(), albertEinstein._id.toString(), 'I am your biggest fan! Can I get your autograph?', 5);
} catch (e) {
    console.log(e.message);
}


console.log('\n---INSERTING VALID REVIEWS---\n');

try {
    const review1 = await reviews.createReview(luke._id.toString(), alien._id.toString(), 'Good experience, thank you!', 5);
    console.log(review1);
} catch (e) {
    console.log(e.message);
}

try {
    const review2 = await reviews.createReview(ark._id.toString(), mrKing._id.toString(), 'I have no complaints', 4);
    console.log(review2);
} catch (e) {
    console.log(e.message);
}

try {
    const review3 = await reviews.createReview(mrKing._id.toString(), luke._id.toString(), 'No problems here besides my delivery arriving one day late', 4);
    console.log(review3);
} catch (e) {
    console.log(e.message);
}

try {
    const review4 = await reviews.createReview(albertEinstein._id.toString(), ark._id.toString(), 'Why in the world did this have a scratch? Unacceptable?', 2);
    console.log(review4);
} catch (e) {
    console.log(e.message);
}

try {
    const review4 = await reviews.createReview(albertEinstein._id.toString(), ark._id.toString(), 'Why in the world did this have a scratch? Unacceptable?', 2);
    console.log(review4);
} catch (e) {
    console.log(e.message);
}




// console.log("\n\n-----TESTING SEARCH, FILTER, SORT------\n\n")
// console.log(await listings.searchByTitle("Pokimon"))
// console.log(await listings.searchByTitle("Pokimon"))
// console.log(await listings.searchByTitle("Mario Kart 8 Deluxe"))
// console.log(await listings.searchByTitle("Splatoon"))
// console.log(await listings.searchByTitle("Pikmin"))
// console.log(await listings.searchByTitle("Minecraft"))

// let elements = {
// 		open: null,
// 		consoles: [],
// 		mainCondition: null,
// 		secondaryCondition: [],
// 		listingType: null,
// 		trades: null,
//         shippingMethods: [],
// 		freeShipping: null,
//         returnPolicy: "null"
// 	}
//console.log(await listings.filterByElements(await listings.getAll(), elements))
// console.log(listings.sortByElement(await listings.getAll(), "By Alphabetically", 0))




console.log('Done seeding database');

await closeConnection();
