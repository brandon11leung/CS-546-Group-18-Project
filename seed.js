
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import * as users from './data/users.js';
import * as listings from './data/listings.js';
import * as reviews from './data/reviews.js';
import * as comments from './data/comments.js';
import * as offers from './data/offers.js';
import * as transactions from './data/transactions.js';

const db = await dbConnection();
await db.dropDatabase();

/* Missing parameters */

try {
    const noParams = await users.createUser();
} catch (e) {
    console.log(e.message);
}

console.log("\n\n-----------\n\n");
/* Invalid first name */

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

console.log("\n\n-----------\n\n");


/* Invalid last name */

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

console.log("\n\n-----------\n\n");
/* Invalid email */

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

console.log("\n\n-----------\n\n");
/* Invalid password */

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


console.log("\n\n-----------\n\n");


/* Invalid username */

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

console.log("\n\n-----------\n\n");

/* Invalid age */

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




/* Invalid city */

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


console.log("\n\n-----------\n\n");

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


console.log("\n\n---END OF PARAMETER CHECKING FOR CREATE USER---\n\n");
console.log("\n---BEGINNING SEEDING PROCESS FOR CREATE USER---\n");


const luke = await users.createUser("Luke", "Muhnicky", "lmuhnick@stevens.edu", "LukeM602", "2002-06-02", "Stevens997*", "Cranford", "NJ");
const patrick = await users.createUser(" Patrick    ", " Hill ", " phill@stevens.edu", " phill1 ", "1975-01-01", "1ErrorCheck!", "Vernon", "NJ");
const ark = await users.createUser("Arkansas", "Apprentice", "aapp1123@gmail.com", " arkman", "2004-02-06", "passWord'56", "Little Rock", "AR");
const mrKing = await users.createUser("mister", "king", " 1coolkid!@gmail.com", " notanarcissist1 ", "2002-04-29", "'yeehaW123", "San Francisco " , "CA");
const gamer = await users.createUser("   gamer    ", "man", "      PHILLISTHEBEST@STEVENS.EDU   ", "games4thwin", "1954-04-29", "i<3Hilll", "    Des Moines  ", "IA");
const albertEinstein = await users.createUser(" albert   ", " einstein ", " 1einstein1@yahoo.com ", " Einstein ", "1924-01-01", "The*Genius123", " jackson  ", "    ms   ");
const handymanny = await users.createUser("    Handy    ", " Manny   ", "  h@m.net", "handymanny", "1982-01-01", "i%T12ool", "  san antonio ", "   tx   ");
const trickyUser = await users.createUser(" tRiCksTeR    ", " uSeR ", " TRICKY@Stevens.edu", " Trickshot12345678910 ", "2004-12-31", "T3094dwkj2()", "Anchorage", "AK");
const alien = await users.createUser("Zeep", "Zorp", "123zorp1@yes.org", "Beep12", "1970-11-22", "oiei32@(!H", "Reno", "NV");
const finalUser = await users.createUser("Barack", "Obama", "presidentobama@something.mil", "ObamaMama<3", "1961-08-04", "Obama804*", "Honolulu", "HI");



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


console.log("\n---MOVING ONTO CHECKUSER ERROR CHECKING---\n");


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



console.log("\n\n-----INSERTING LISTINGS------\n\n");

const validListing = await listings.create(patrick._id.toString(), "Pokemon Soulsilver", "Sell", "Used", ["Cartridge", "Case", "Manual"], 240, ["http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/reerc8i3tjznvmqhlqjs.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/oemwvopsiu2iimargiyo.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/egxvogoclhmgy8wj5imd.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/c9s0cvrpziyqofisaltb.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157470/rjkgsuh7hl0g6gztaubj.jpg"], ["Pokemon HeartGold Loose", "Pokemon HeartGold CIB"], 10, ["USPS Priority"], "Good and clean copy, tested working, refer to images for condition.", "No returns", "USD", 38623)
try {
    // const validListing = await listings.create(patrick._id.toString(), "Pokemon Soulsilver", "Sell", "Used", ["Cartridge", "Case", "Manual"], 240, ["http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/reerc8i3tjznvmqhlqjs.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/oemwvopsiu2iimargiyo.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/egxvogoclhmgy8wj5imd.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/c9s0cvrpziyqofisaltb.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157470/rjkgsuh7hl0g6gztaubj.jpg"], ["Pokemon HeartGold Loose", "Pokemon HeartGold CIB"], 10, ["USPS Priority"], "Good and clean copy, tested working, refer to images for condition.", "No returns", "USD", 38623)
    const validListing2 = await listings.create(ark._id.toString(), "Rhythm Thief and the Emperors Treasure", "Buy", "Used", ["Cartridge", "Case", "Manual"], 240, ["http://res.cloudinary.com/joystick-junction/image/upload/v1683157699/r1ilyogmsge3bouarq48.jpg"], [], 0, ["USPS Priority"], "Cartridge Only", "No returns", "USD", 32913);
    const validListing3 = await listings.create(ark._id.toString(), "Pokemon Pearl Loose", "Sell", "Used", ["Cartridge"], 35, ["https://i.imgur.com/vRFFSm7.jpeg", "https://i.imgur.com/HnWMwol.jpeg"], [], 0, ["USPS First Class"], "Cartridge Only", "No returns", "USD", 4124);
    const ssID = validListing._id.toString();
    console.log("get\n")
    console.log(await listings.get(ssID))
    console.log(await listings.update(ssID, true, "Pokemon Soulsilver", "Sell", "Used", ["Cartridge", "Case", "Manual"], 185, ["http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/reerc8i3tjznvmqhlqjs.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157468/oemwvopsiu2iimargiyo.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/egxvogoclhmgy8wj5imd.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157469/c9s0cvrpziyqofisaltb.jpg", "http://res.cloudinary.com/joystick-junction/image/upload/v1683157470/rjkgsuh7hl0g6gztaubj.jpg"], [],  10, ["USPS Priority"], "Good condition copy.", "No returns", "USD"))
    console.log("getAll\n")
    console.log(await listings.getAll())
    console.log("remove\n")
    //console.log(await listings.remove(validListing3._id.toString()))
    console.log(await listings.updateStatus(ssID, false))
    console.log(await listings.getAll())
    console.log("\n\n-----INSERTING OFFERS------\n\n");

    const validMoneyOffer1 = await offers.create(ssID, "644ff220e48b8901e0211642", 0, 145, "", []);
    console.log(validMoneyOffer1);
    const validTradeOffer1 = await offers.create(ssID, "644ff220e48b8901e0211643", 1, 0, "Pokemon HeartGold CIB", ["https://u-mercari-images.mercdn.net/photos/m26281566540_1.jpg?1677724813"]);
    console.log(validTradeOffer1);
    const validMixedOffer1 = await offers.create(ssID, "644ff220e48b8901e0211644", 2, 145, "Pokemon HeartGold Loose", []);
    console.log(validMixedOffer1);
    await offers.remove(validMixedOffer1._id.toString())
    console.log(await offers.getAll(ssID))

    console.log('\n\n-----INSERTING COMMENTS-----\n\n');

    const goodComment = await comments.createComment(validListing._id.toString(), luke._id.toString(), "Woah, this game looks really cool! Mind if you tell me more?");
    console.log(goodComment);
    const goodComment2 = await comments.createComment(validListing2._id.toString(), luke._id.toString(), "I never heard of this game before. It looks really good though.");
    console.log(goodComment2);
    
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
    const badId = await comments.createComment(validListing._id.toString(), '100', "I'm going to try and break this");
} catch (e) {
    console.log(e.message);
}

    


console.log("\n\n-----INSERTING REVIEWS-----\n\n");
/* Patrick reviews the Arkansas Apprentice */
try {
    const goodReview = await reviews.createReview(patrick._id.toString(), ark._id.toString(), 'This guy is from Arkansas; therefore, I like him', 5);
    console.log(goodReview);
} catch (e) {
    console.log(e.message);
}

try {
    const averageReview = await reviews.createReview(mrKing._id.toString(), handymanny._id.toString(), 'He took his sweet time with shipping. Product was in good shape', 3);
    console.log(averageReview);
} catch (e) {
    console.log(e.message);
}

try {
    const gotScammed = await reviews.createReview(finalUser._id.toString(), alien._id.toString(), 'This alien fellow did not sell me a good product', 1);
    console.log(gotScammed);
} catch (e) {
    console.log(e.message);
}

try {
    const duplicateReview = await reviews.createReview(patrick._id.toString(), ark._id.toString(), 'I found out he was not actually from Arkansas, whoops', 2);
} catch (e) {
    console.log(e.message);
}

try {
    const iLoveLuke = await reviews.createReview(patrick._id.toString(), luke._id.toString(), 'The product shipped with excellent quality. You are my favorite student <3', 5);
    console.log(iLoveLuke);
} catch (e) {
    console.log(e.message);
}

try {
    const lukeIsOkay = await reviews.createReview(mrKing._id.toString(), luke._id.toString(), 'I saw a scratch on the back of the box. As someone who expects perfection, this is clearly disappointing.', 3);
} catch (e) {
    console.log(e.message);
}

try {
    const thisIsWhatsUp = await reviews.createReview(albertEinstein._id.toString(), luke._id.toString(), 'Exquisite product. Makes me think about the theory of relativity.', 5);
} catch (e) {
    console.log(e.message);
}


console.log("\n\n-----INSERTING TRANSACTIONS-----\n\n");
//Working example (ONLY WITH A LISTING ID THAT YOU KNOW WILL BE IN THERE)
try {
    const goodTransaction = await (transactions.createTransaction(validListing._id.toString(), luke._id.toString()));
    console.log(goodTransaction);
} catch(e) {
    console.log(e.message);
}

console.log("Search Tests")

console.log(await listings.searchByTitle("Pok"))

console.log('Done seeding database');

await closeConnection();
