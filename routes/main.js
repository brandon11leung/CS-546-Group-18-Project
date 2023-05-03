import {Router} from 'express';
const router = Router();
// import {userDataFunctions} from '../data/index.js';
import * as helpers from '../helpers.js';
import * as users from '../data/users.js'
import * as listings from '../data/listings.js'

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
        let user = await users.getUserById(req.session.user.id);
        res.render('accountInfo', {title: "Account", user: user});
        } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/listings').get(async (req, res) => {
    try {
        let allListings = await listings.getAll(); 
        res.render('listings', {title: "Listings Station",listings: allListings});
        } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/signup').get(async (req, res) => {
    try {
        res.render('createAccount', {title: 'Create an Account'});
    } catch (e) {
        res.status(500).json({error: e});
    }
})
.post(async (req, res) => {
    if (!helpers.validName(req.body.firstNameInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid first name'});
    }

    if (!helpers.validName(req.body.lastNameInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid last name'});
    }

    if (!helpers.validEmail(req.body.emailAddressInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid email'});
    }

    if (!helpers.validUsername(req.body.usernameInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid username'});
    }

    if (!helpers.validPassword(req.body.passwordInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid password'});
    }

    if (!helpers.validCity(req.body.cityInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid city'});
    }

    if (!helpers.validState(req.body.stateInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid state'});
    }

    console.log(req.body.DOBInput);
    console.log(typeof req.body.DOBInput);

    try {
        await users.createUser(req.body.firstNameInput, req.body.lastNameInput, req.body.emailAddressInput, req.body.usernameInput, req.body.DOBInput, req.body.passwordInput, req.body.cityInput, req.body.stateInput);
        res.redirect('/login');
    } catch (e) {
        console.log(e.message);
        res.status(500).render('createAccount', {title: 'Create an Account', error: e});
    }

});

router.route('/login').get(async (req, res) => {
    try {
        res.render('login', {title: 'Login'})
    } catch (e) {
        res.status(500).json({error: e});
    }
}).post(async (req, res) => {
    if (!helpers.validEmail(req.body.emailAddressInput)) {
        res.status(400).render('login', {title: 'Login', error: 'Invalid email address'})
    }

    if (!helpers.validPassword(req.body.passwordInput)) {
        res.status(400).render('login', {title: 'Login', error: 'Invalid password'})
    }

    try {
        const authenticated = await users.checkUser(req.body.emailAddressInput, req.body.passwordInput);
        req.session.user = {firstName: authenticated[0], lastName: authenticated[1], emailAddress: authenticated[2], username: authenticated[4], id: authenticated[5]};
        res.redirect('/');
    } catch (e) {
        console.log(e.message);
        res.status(500).render('login', {title: 'Login', error: 'Either the email or password are incorrect'})
    }
});

router.route('/transaction').get(async (req, res) => {
    try {
        res.render('transaction', {title: "Checkout", pic: 'public/images/Credit-Card-Logos-high-resolution.png'});
    } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/createListing').get(async (req, res) => {
    try {
        res.render('createListing', {title: 'Create a Lisitng'});
    } catch (e) {
        res.status(500).json({error: e});
    }});

 export default router;