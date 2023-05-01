import {Router} from 'express';
const router = Router();
// import {userDataFunctions} from '../data/index.js';
// import * as helpers from '../helpers.js';

router.route('/').get(async (req, res) => {
    try {
        res.render('homepage', {title: "Joystick Junction"});
      } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/aboutUs').get(async (req, res) => {
    try {
        res.render('aboutUs', {title: "About Us"});
      } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/account').get(async (req, res) => {
    try {
        res.render('accountInfo', {title: "Account"});
        } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/listings').get(async (req, res) => {
    try {
        res.render('listings', {title: "Listings Station"});
        } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/signup').get(async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({error: e});
    }


});

router.route('/transaction').get(async (req, res) => {
    try {
        res.render('transaction', {title: "Checkout", pic: 'public/images/Credit-Card-Logos-high-resolution.png'});
    } catch (e) {
        res.status(500).json({error: e});
    }});

 export default router;