import {Router} from 'express';
const router = Router();
// import {userDataFunctions} from '../data/index.js';
import * as helpers from '../helpers.js';
import * as users from '../data/users.js'
import * as listings from '../data/listings.js'
import xss from 'xss';

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

router.route('/sellinglistings/:id').get(async (req, res) => {
    try {
        let List = await listings.get(req.params.id); 
        res.render('listingsById', {title: List.title,listings: List});
        } catch (e) {
        res.status(500).json({error: e});
    }})
    .post(async (req, res) => {

        req.body.commentInput = xss(req.body.commentInput);
        
        if (!helpers.isValidString(req.body.commentInput)) {
            res.status(400).render('login', {title: 'Login', error: 'Invalid email address'})
        }
        try {
            await listings.addComment(req.params.id, req.session.user.username, req.session.user.id, req.body.commentInput);
            res.redirect('/sellinglistings/'+ req.params.id);
        } catch (e) {
            console.log(e.message);
            res.status(500).render('login', {title: 'Login', error: 'Either the email or password are incorrect'})
        }
    });

router.route('/sellinglistings').get(async (req, res) => {
    try {
        let allListings = await listings.getAll();
        let Ready = [];
        for (let x of allListings){
            if(x.listingType === "Sell"){
                let lplusI = {listing: x,img: x.attachments[0]}
                Ready.push(lplusI);
            }
        } 
        res.render('sellingListings', {title: "Selling Station",listings: Ready});
        } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/buyinglistings/:id').get(async (req, res) => {
        try {
            let List = await listings.get(req.params.id); 
            res.render('listingsById', {title: List.title,listings: List});
            } catch (e) {
            res.status(500).json({error: e});
        }})
        .post(async (req, res) => {

            req.body.commentInput = xss(req.body.commentInput);
            
            if (!helpers.isValidString(req.body.commentInput)) {
                res.status(400).render('login', {title: 'Login', error: 'Invalid email address'})
            }
        
            try {
                await listings.addComment(req.params.id, req.session.user.username, req.session.user.id, req.body.commentInput);
                res.redirect('/buyinglistings/'+ req.params.id);
            } catch (e) {
                console.log(e.message);
                res.status(500).render('login', {title: 'Login', error: 'Either the email or password are incorrect'})
            }
        });
    
router.route('/buyinglistings').get(async (req, res) => {
        try {
            let allListings = await listings.getAll();
            let Ready = [];
            for (let x of allListings){
                if(x.listingType === "Buy"){
                    let lplusI = {listing: x,img: x.attachments[0]}
                    Ready.push(lplusI);
                }
            } 
            res.render('buyingListings', {title: "Buying Bazaar",listings: Ready});
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

    // XSS Registration
    req.body.firstNameInput = xss(req.body.firstNameInput);
    req.body.lastNameInput = xss(req.body.lastNameInput);
    req.body.emailAddressInput = xss(req.body.emailAddressInput);
    req.body.usernameInput = xss(req.body.usernameInput);
    req.body.passwordInput = xss(req.body.passwordInput);
    req.body.DOBInput = xss(req.body.DOBInput);
    req.body.cityInput = xss(req.body.cityInput);
    req.body.stateInput = xss(req.body.stateInput);
    req.body.bioInput = xss(req.body.bioInput);
    
    
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

    if (!helpers.validDOB(req.body.DOBInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid date of birth'});
    }

    if (!helpers.validCity(req.body.cityInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid city'});
    }

    if (!helpers.validState(req.body.stateInput)) {
        res.status(400).render('createAccount', {title: 'Create an Account', error: 'Invalid state'});
    }

    try { 
        if (req.body.bioInput) {
            await users.createUser(req.body.firstNameInput, req.body.lastNameInput, req.body.emailAddressInput, req.body.usernameInput, req.body.DOBInput, req.body.passwordInput, req.body.cityInput, req.body.stateInput, req.body.bioInput);
        }
        else {
            await users.createUser(req.body.firstNameInput, req.body.lastNameInput, req.body.emailAddressInput, req.body.usernameInput, req.body.DOBInput, req.body.passwordInput, req.body.cityInput, req.body.stateInput);
        }
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

    req.body.emailAddressInput = xss(req.body.emailAddressInput);
    req.body.passwordInput = xss(req.body.passwordInput);
    
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
        res.render('createListing', {title: 'Create a Listing'});
    } catch (e) {
        res.status(500).json({error: e});
    }});

 export default router;