/*******************************************************************************
 * Name        : bands.js (route)
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 bands route function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {bandsData} from '../data/index.js';
import * as helpers from '../helpers.js';

router
    .route('/')
    .get(async (req, res) => {
    //code here for GET
        try {
            let bandsList = await bandsData.getAll();
            res.status(200).json(bandsList);
        } catch (e) {
            res.status(500);
        }
    })
    .post(async (req, res) => {
    //code here for POST
        let bandInfo = req.body;
        if (!bandInfo || Object.keys(bandInfo).length === 0) {
            return res.status(400).json({error: 'There are no fields in the request body'});
        }
        try {
            helpers.isValidString(bandInfo.name);
            helpers.isValidString(bandInfo.recordCompany);
            helpers.isValidURL(bandInfo.website);

            helpers.isValidArray(bandInfo.genre);
            helpers.isValidArray(bandInfo.groupMembers);
            helpers.isValidYear(bandInfo.yearBandWasFormed);
            for (let i = 0; i < bandInfo.genre.length; i++) {
                helpers.isValidString(bandInfo.genre[i]);
            }
            for (let i = 0; i < bandInfo.groupMembers.length; i++) {
                helpers.isValidString(bandInfo.groupMembers[i]);
            }
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
        const newBand = await bandsData.create(
            bandInfo.name,
            bandInfo.genre,
            bandInfo.website,
            bandInfo.recordCompany,
            bandInfo.groupMembers,
            bandInfo.yearBandWasFormed
        );
        res.status(200).json(newBand);
        } catch (e) {
        res.status(500);
        }
    });

router
    .route('/:id')
    .get(async (req, res) => {
    //code here for GET
        if (req.params.id.includes("%")) {return res.status(400).json({error: "Bad input"});}
        try {
            req.params.id = helpers.isValidID(req.params.id);
        } catch (e) {
            return res.status(400).json({error: "Bad input"});
        }
        try {
            let bandObj = await bandsData.get(req.params.id);
            res.status(200).json(bandObj);
        } catch (e) {
            res.status(404).json({error: 'Band not found.'});
        }
    })

    .delete(async (req, res) => {
        //code here for DELETE
        try {
            helpers.isValidID(req.params.id);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            await bandsData.remove(req.params.id);
            let deleteObj = {bandId: req.params.id, deleted: true}
            res.status(200).json(deleteObj);
        } catch (e) {
            res.status(404).json({error: 'Band not found.'});
        }
    })
    .put(async (req, res) => {
        //code here for PUT
        let bandInfo = req.body;
        if (!bandInfo || Object.keys(bandInfo).length === 0) {
            return res.status(400).json({error: 'There are no fields in the request body'});
        }
        try {
            helpers.isValidString(bandInfo.name);
            helpers.isValidString(bandInfo.recordCompany);
            helpers.isValidURL(bandInfo.website);

            helpers.isValidArray(bandInfo.genre);
            helpers.isValidArray(bandInfo.groupMembers);
            helpers.isValidYear(bandInfo.yearBandWasFormed);
            for (let i = 0; i < bandInfo.genre.length; i++) {
                helpers.isValidString(bandInfo.genre[i]);
            }
            for (let i = 0; i < bandInfo.groupMembers.length; i++) {
                helpers.isValidString(bandInfo.groupMembers[i]);
            }
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const updatedBand = await bandsData.update(
                req.params.id,
                bandInfo.name,
                bandInfo.genre,
                bandInfo.website,
                bandInfo.recordCompany,
                bandInfo.groupMembers,
                bandInfo.yearBandWasFormed
            );
            res.status(200).json(updatedBand);
        } catch (e) {
            res.status(400).json({error: "Error: cannot have the same elements"});
        }
    });

export default router;
