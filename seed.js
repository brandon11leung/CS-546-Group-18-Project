/*******************************************************************************
 * Name        : seed.js
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 seed function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import * as bands from './data/bands.js';
import * as albums from './data/albums.js';

const db = await dbConnection();
await db.dropDatabase();

const haken = await bands.create("Haken", ["Progressive Metal", "Progressive Rock"], "http://www.hakenmusic.com", "Inside Out", ["Ross Jennings", "Richard Henshall", "Raymond Hearne", "Charles Griffiths", "Conner Green", "Peter Jones"], 2007);
const hakenId = haken._id.toString();
await bands.update(hakenId,"Haken", ["Progressive Metal", "Progressive Rock"], "http://www.hakenmusic.com", "Inside Out", ["Ross Jennings", "Richard Henshall", "Raymond Hearne", "Charles Griffiths", "Conner Green", "Peter Jones"], 2007);

//const xero = await bands.create("Xero", ["Alternative Rock", "Pop Rock", "Alternative Metal"], "http://www.linkinpark.com", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],1996);
//const xeroId = xero._id.toString();
const blueOysterCult = await bands.create("Blue Oyster Cult", ["Hard Rock", "Heavy Metal", "Occult Rock", "Progressive Rock", "Psychedelic Rock", "Acid Rock"], "http://www.blueoystercult.com", "Columbia", ["Buck Dharma", "Eric Bloom", "Danny Miranda", "Richie Castellano", "Jules Radino"], 1967);
const bocId = blueOysterCult._id.toString();
//const linkinPark = await bands.rename(xero._id, "Linkin Park")
// (bandId, title, releaseDate, tracks, rating) => { // Good?
const mou = await albums.create(hakenId, "The Mountain", "09/02/2013", ["The Path", "Atlas Stone", "Cockroach King"], 5);
const affinity = await albums.create(hakenId, "Affinity", "04/29/2016", ["affinity.exe", "Initiate", "1985"], 5);
const vec = await albums.create(hakenId, "Vector", "10/26/2018", ["Clear", "The Good Doctor", "Puzzle Box"], 4);
console.log(mou)
await albums.create(bocId, "Secret Treaties", "04/05/1974", ["Career of Evil", "Subhuman", "Dominance and Submission"], 5);
await albums.create(bocId, "Fire Of The Unknown Origin", "06/22/1981", ["Fire of Unknown Origin", "Burnin' For You", "Veteran of the Psychic Wars"], 5);
//await albums.getAll(hakenId)
const affid = affinity._id.toString()
const mouid = mou._id.toString()
const vecid = vec._id.toString()
//  console.log(await albums.remove(affid))
//   console.log(await albums.remove(mouid))
//  console.log(await albums.remove(vecid))
//  console.log(await bands.remove(hakenId))

console.log('Done seeding database');

await closeConnection();









    

