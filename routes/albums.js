/************************************************************************************
 * Name        : albums.js (route)
 * Author      : Brandon Leung
 * Date        : March 25, 2023
 * Description : Lab 6 albums route function implementation.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ***********************************************************************************/
// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {albumsData} from '../data/index.js';
import {bandsData} from '../data/index.js';
import * as helpers from '../helpers.js';

router
    .route('/:bandId')
    .get(async (req, res) => {
    //code here for GET
        try {
            helpers.isValidID(req.params.bandId);
        } catch(e) {
            return res.status(400).json({error: e});
        }

        try {
            const albumsList = await albumsData.getAll(req.params.bandId);
            if (albumsList.length == 0) {throw new Error("Error: no albums for that bad are found.")}
            res.status(200).json(albumsList);
        } catch (e) {
            res.status(404).json({error: 'Band not found or albums do not exist.'});
        }
    })
    .post(async (req, res) => {
        let albumInfo = req.body;
        if (!albumInfo || Object.keys(albumInfo).length === 0) {
            return res.status(400).json({error: 'There are no fields in the request body'});
        }
        try {
            req.params.bandId = helpers.isValidID(req.params.bandId);
            helpers.isValidString(albumInfo.title);
            helpers.isValidDate(albumInfo.releaseDate);
            helpers.isValidArray(albumInfo.tracks);
            helpers.isValidRating(albumInfo.rating);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const newAlbum = await albumsData.create(
                req.params.bandId,
                albumInfo.title,
                albumInfo.releaseDate,
                albumInfo.tracks,
                albumInfo.rating,
            );
            const bandObj = await bandsData.get(req.params.bandId);
            res.status(200).json(bandObj);
        } catch (e) {
            res.status(500).json({error: e});
        }
    });

router
    .route('/album/:albumId')
    .get(async (req, res) => {
        //code here for GET
        try {
            helpers.isValidID(req.params.albumId);
        } catch(e) {
            res.status(400);
        }
        try {
            const album = await albumsData.get(req.params.albumId);
            res.status(200).json(album);
        } catch (e) {
            res.status(404).json({error: 'Album not found.'});
        }
    })
    .delete(async (req, res) => {
    //code here for DELETE
        try {
            helpers.isValidID(req.params.albumId);
        } catch(e) {
            res.status(400);
        }
        try {
            let fail = 0;
            try {
                await albumsData.get(req.params.albumId);
            } catch (e) {
                fail = 1;
            }
            if (fail == 1) {
                throw new Error("Error: ")
            }
            await albumsData.remove(req.params.albumId);
            let deleteObj = {albumId: req.params.albumId, deleted: true}
            res.status(200).json(deleteObj);
        } catch (e) {
            res.status(404).json({error: 'Album not found.'});
        }
    });

export default router;
