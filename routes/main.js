import {Router} from 'express';
const router = Router();
// import {userDataFunctions} from '../data/index.js';
import * as helpers from '../helpers.js';
import * as users from '../data/users.js'
import * as listings from '../data/listings.js'
import * as reviews from '../data/reviews.js'
import * as charting from '../utils/pricecharting.js'
import * as cloud from '../utils/cloudinary.js'
import * as transactions from '../data/transactions.js'
import xss from 'xss';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
import {dirname} from 'path';
const __dirname = dirname(__filename);

router.route('/').get(async (req, res, next) => {
    if (!req.session.user) {
        try {
            return res.render('homepage', {title: "Joystick Junction"});
          } catch (e) {
            return res.status(500).json({error: e});
        }
      } else {
        try {
            return res.render('homepage2', {title: "Joystick Junction"});
          } catch (e) {
            return res.status(500).json({error: e});
        }
      }
      next();
   });

router.route('/aboutUs').get(async (req, res) => {
    try {
        res.render('aboutUs', {title: "About Us"});
      } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/account').get(async (req, res) => {
    try {
        let user = await users.getUserById(req.session.user.id);
        let reviews;
        if(user.reviewedBy.length > 0){
            reviews = [];
            for (let x of user.reviewedBy){
                let rev = {name: x[1], message: x[2], rating: x[3]};
                reviews.push(rev);
            }
        }
        res.render('accountInfo', {title: "Account", user: user, reviews: reviews});
        } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/sellinglistings/:id').get(async (req, res) => {
    try {
        let List = await listings.get(req.params.id); 
        let priceChartData = await charting.searchByID(List.pricechartingID.toString());
        let user = await users.getUserById(List.posterId.toString())
        let username = user.username;
        let tradeCheck = true;
            if(List.trades.length === 1 && List.trades[0] === ''){
                tradeCheck = false;
            }

        if (username === req.session.user.username) {
            res.render('listingsById', {title: List.title,listings: List, chart: priceChartData, type: "Buy Now", username: username, check: true, tradeCheck: tradeCheck, ownPoster: false});
        } else {
            res.render('listingsById', {title: List.title,listings: List, chart: priceChartData, type: "Buy Now", username: username, check: true, tradeCheck: tradeCheck, ownPoster: true});
        }
        } catch (e) {
        res.status(500).json({error: e});
    }})
    .post(async (req, res) => {
        if(!req.session.user){
            res.redirect('/login');
        }
        req.body.commentInput = xss(req.body.commentInput);
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
                let listinguser = await users.getUserById(x.posterId.toString())
                let lplusI;
                if (listinguser.overallRating === 0){
                    lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: "User not Rated"}
                }
                else{ lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: listinguser.overallRating};}
                Ready.push(lplusI);
            }
        } 
        res.render('sellingListings', {title: "Selling Station",listings: Ready});
        } catch (e) {
            console.log(e);
        res.status(500).json({error: e});
    }})
    .post(async (req, res) => {
             
                

           
        try {
            let sfsData = req.body;
            sfsData.searchBarTextInput = req.body.searchBarTextInput || ""
            sfsData.mainConditionDropdown = req.body.mainConditionDropdown || null
            sfsData.console = req.body.console || null
            sfsData.deliveryMethodDropdown = req.body.deliveryMethodDropdown || null
            sfsData.acceptsTradesDropdown = req.body.acceptsTradesDropdown || null
            sfsData.acceptsReturnsDropdown = req.body.acceptsReturnsDropdown || null
            sfsData.freeShippingDropdown = req.body.freeShippingDropdown || null
            sfsData.sortBy = req.body.sortBy || 'Default'
            sfsData.secondaryCondition = req.body.secondaryCondition || []
            sfsData.closedCheckbox = req.body.closedCheckbox || true
            sfsData.sortReverseCheckbox = req.body.sortReverseCheckbox || 0

            if (sfsData.acceptsTradesDropdown == "true") {
                sfsData.acceptsTradesDropdown = true;
            } else if (sfsData.acceptsTradesDropdown == "false") {
                sfsData.acceptsTradesDropdown = false;
            }

            if (sfsData.acceptsReturnsDropdown == "true") {
                sfsData.acceptsReturnsDropdown = true;
            } else if (sfsData.acceptsReturnsDropdown == "false") {
                sfsData.acceptsReturnsDropdown = false;
            }

            if (sfsData.freeShippingDropdown == "true") {
                sfsData.freeShippingDropdown = true;
            } else if (sfsData.freeShippingDropdown == "false") {
                sfsData.freeShippingDropdown = false;
            }

            if (sfsData.closedCheckbox == "false") {
                sfsData.closedCheckbox = false;
            } 

            if (sfsData.sortReverseCheckbox == "1") {
                sfsData.sortReverseCheckbox = 1;
            } 

            if (sfsData.deliveryMethodDropdown == "Both") {
                sfsData.deliveryMethodDropdown = "Both Shipping and Local Meetup"
            }
            
            if (Array.isArray(sfsData.secondaryCondition) == false) {
                sfsData.secondaryCondition = [sfsData.secondaryCondition]
            }

            const elements = {
                open: sfsData.closedCheckbox,
                console: sfsData.console,
                mainCondition: sfsData.mainConditionDropdown,
                secondaryCondition: sfsData.secondaryCondition,
                listingType: "Sell",
                trades: sfsData.acceptsTradesDropdown,
                shippingMethods: sfsData.deliveryMethodDropdown,
                freeShipping: sfsData.freeShippingDropdown,
                returnPolicy: sfsData.acceptsReturnsDropdown
            }
            
            let Ready = []
            let sfsListings = await listings.sortByElement(await listings.filterByElements(await listings.searchByTitle(sfsData.searchBarTextInput), elements), sfsData.sortBy, sfsData.sortReverseCheckbox)
            for (let x of sfsListings){
                if(x.listingType === "Sell"){
                    let listinguser = await users.getUserById(x.posterId.toString())
                    let lplusI;
                    if (listinguser.overallRating === 0){
                        lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: "User not Rated"}
                    }
                    else{ lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: listinguser.overallRating};}
                    Ready.push(lplusI);
                }
            } 
            res.render('sellingListings', {title: "Selling Station",listings: Ready});
                } catch (e) {
                res.status(500).json({error: e});
                }
        });;

router.route('/transaction/:id').get(async (req, res) => {
    try {
        let List = await listings.get(req.params.id); 
        res.render('transaction', {title: "Checkout", pic: '../public/images/Credit-Card-Logos-high-resolution.png', link: `/transaction/${List._id}`});
    } catch (e) {
        res.status(500).json({error: e});
    }})
    .post(async (req, res) => {
        try {
            let List = await listings.get(req.params.id); 
            let transaction = await transactions.createTransaction(List._id, req.session.user.id)
            res.redirect('/account');
        } catch (e) {
            res.status(500).json({error: e});
        }
    });

router.route('/buyinglistings/:id').get(async (req, res) => {
        try {
            let List = await listings.get(req.params.id); 
            let priceChartData = await charting.searchByID(List.pricechartingID.toString());
            let user = await users.getUserById(List.posterId.toString())
            let username = user.username;
            let tradeCheck = true;
            if(List.trades.length === 1 && List.trades[0] === ''){
                tradeCheck = false;
            }
            if (username === req.session.user.username) {
                res.render('listingsById', {title: List.title,listings: List, chart: priceChartData, type: "Offer Trade", username: username, check: false, tradeCheck: tradeCheck, ownPoster: false});
            } else {
                res.render('listingsById', {title: List.title,listings: List, chart: priceChartData, type: "Offer Trade", username: username, check: false, tradeCheck: tradeCheck, ownPoster: true});
            }
            } catch (e) {
            res.status(500).json({error: e});
        }})
        .post(async (req, res) => {
            if(!req.session.user){
                res.redirect('/login');
            }
            req.body.commentInput = xss(req.body.commentInput);
        
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
                        let listinguser = await users.getUserById(x.posterId.toString())
                        let lplusI;
                        if (listinguser.overallRating === 0){
                            lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: "User not Rated"}
                        }
                        else{ lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: listinguser.overallRating};}
                        Ready.push(lplusI);
                    }
                } 
                res.render('buyingListings', {title: "Buying Bazaar",listings: Ready});
                } catch (e) {
                res.status(500).json({error: e});
            }})
            .post(async (req, res) => {
            try {
                let sfsData = req.body;
                sfsData.searchBarTextInput = req.body.searchBarTextInput || ""
                sfsData.mainConditionDropdown = req.body.mainConditionDropdown || null
                sfsData.console = req.body.console || null
                sfsData.deliveryMethodDropdown = req.body.deliveryMethodDropdown || null
                sfsData.acceptsTradesDropdown = req.body.acceptsTradesDropdown || null
                sfsData.acceptsReturnsDropdown = req.body.acceptsReturnsDropdown || null
                sfsData.freeShippingDropdown = req.body.freeShippingDropdown || null
                sfsData.sortBy = req.body.sortBy || 'Default'
                sfsData.secondaryCondition = req.body.secondaryCondition || []
                sfsData.closedCheckbox = req.body.closedCheckbox || true
                sfsData.sortReverseCheckbox = req.body.sortReverseCheckbox || 0

                if (sfsData.acceptsTradesDropdown == "true") {
                    sfsData.acceptsTradesDropdown = true;
                } else if (sfsData.acceptsTradesDropdown == "false") {
                    sfsData.acceptsTradesDropdown = false;
                }

                if (sfsData.acceptsReturnsDropdown == "true") {
                    sfsData.acceptsReturnsDropdown = true;
                } else if (sfsData.acceptsReturnsDropdown == "false") {
                    sfsData.acceptsReturnsDropdown = false;
                }

                if (sfsData.freeShippingDropdown == "true") {
                    sfsData.freeShippingDropdown = true;
                } else if (sfsData.freeShippingDropdown == "false") {
                    sfsData.freeShippingDropdown = false;
                }

                if (sfsData.closedCheckbox == "false") {
                    sfsData.closedCheckbox = false;
                } 

                if (sfsData.sortReverseCheckbox == "1") {
                    sfsData.sortReverseCheckbox = 1;
                } 

                if (sfsData.deliveryMethodDropdown == "Both") {
                    sfsData.deliveryMethodDropdown = "Both Shipping and Local Meetup"
                }
                if (Array.isArray(sfsData.secondaryCondition) == false) {
                    sfsData.secondaryCondition = [sfsData.secondaryCondition]
                }
                console.log(sfsData)
                
                let allListings = await listings.getAll();

                const elements = {
                    open: sfsData.closedCheckbox,
                    console: sfsData.console,
                    mainCondition: sfsData.mainConditionDropdown,
                    secondaryCondition: sfsData.secondaryCondition,
                    listingType: "Buy",
                    trades: sfsData.acceptsTradesDropdown,
                    shippingMethods: sfsData.deliveryMethodDropdown,
                    freeShipping: sfsData.freeShippingDropdown,
                    returnPolicy: sfsData.acceptsReturnsDropdown
                }
                
                let Ready = []
                let sfsListings = await listings.sortByElement(await listings.filterByElements(await listings.searchByTitle(sfsData.searchBarTextInput), elements), sfsData.sortBy, sfsData.sortReverseCheckbox)
                for (let x of sfsListings){
                    if(x.listingType === "Buy"){
                        let listinguser = await users.getUserById(x.posterId.toString())
                        let lplusI;
                        if (listinguser.overallRating === 0){
                            lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: "User not Rated"}
                        }
                        else{ lplusI = {listing: x,img: x.attachments[0], user: listinguser, rating: listinguser.overallRating};}
                        Ready.push(lplusI);
                    }
                } 
                res.render('buyingListings', {title: "Buying Bazaar",listings: Ready});
                    } catch (e) {
                    res.status(500).json({error: e});
                    }
            });

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



    router.route('/PriceChartSearch').get(async (req, res) => {
        try {
            res.render('priceCharting', {title: 'Search for data'});
        } catch (e) {
            res.status(500).json({error: e});
        }})
        .post(async (req, res) => {
            req.body.searchInput = xss(req.body.searchInput);
            req.body.listingTypeInput = xss(req.body.listingTypeInput);
            if(req.body.searchInput){
                try {
                    let chart = await charting.searchByTerm(req.body.searchInput);
                    if(req.body.listingTypeInput === "Buy"){
                        res.render('createBuyingListing', {title: 'Create a Buying Listing', chart: chart});
                    }
                    else{
                        res.render('createListing', {title: 'Create a Selling Listing', chart: chart});
                    }
                } catch (e) {
                    console.log(e.message);
                    res.status(500).render('priceCharting', {title: 'Search for a game', error: 'Invalid search'})
                }
            }
            else{
                req.body.listingTypeInput = xss(req.body.listingTypeInput);
                req.body.TitleInput = xss(req.body.TitleInput);
                req.body.pcIdInput = xss(req.body.pcIdInput);
                req.body.conditionInput = xss(req.body.conditionInput);
                req.body.priceInput = xss(req.body.priceInput);
                req.body.descriptionInput = xss(req.body.descriptionInput);
                req.body.imageInput = xss(req.body.imageInput);
                req.body.shipMethodInput = xss(req.body.shipMethodInput);
                req.body.tradesInput = xss(req.body.tradesInput);
                
                req.body.Cartridge = xss(req.body.Cartridge);
                req.body.Box = xss(req.body.Box);
                req.body.Case = xss(req.body.Case);
                req.body.Manual = xss(req.body.Manual);
                req.body.Console = xss(req.body.Console);
                req.body.Controller = xss(req.body.Controller);
                req.body.Disc = xss(req.body.Disc);
                req.body.Cables = xss(req.body.Cables);
                req.body.RedemptionCode = xss(req.body.RedemptionCode);
                req.body.Other = xss(req.body.Other);
                
                let secCond = [];
                if(req.body.Cartridge){
                    secCond.push(req.body.Cartridge);
                }
                if(req.body.Box){
                    secCond.push(req.body.Box);
                }
                if(req.body.Case){
                    secCond.push(req.body.Case);
                }
                if(req.body.Manual){
                    secCond.push(req.body.Manual);
                }
                if(req.body.Console){
                    secCond.push(req.body.Console);
                }
                if(req.body.Controller){
                    secCond.push(req.body.Controller);
                }
                if(req.body.Disc){
                    secCond.push(req.body.Disc);
                }
                if(req.body.Cables){
                    secCond.push(req.body.Cables);
                }
                if(req.body.RedemptionCode){
                    secCond.push(req.body.RedemptionCode);
                }
                if(req.body.Other){
                    secCond.push(req.body.Other);
                }   
                console.log(req.files);
                let paths = [];
                let Allimages = req.files.imageInput;
                let validTrades = req.body.tradesInput;
                if(validTrades){
                    validTrades = [];
                }
                else{
                    validTrades = validTrades.split(",");
                }
                
                if (typeof(Allimages) !== "object"){
                    for(let x of req.files.imageInput){
                        const image = x;
                        const writeStream = fs.createWriteStream(path.join(__dirname, '..', 'uploads', image.name));
                        paths.push(path.join(__dirname, '..', 'uploads', image.name));
                        await writeStream.write(image.data);
                        await writeStream.end();
                    }
                }
                else{
                        const image = Allimages;
                        const writeStream = fs.createWriteStream(path.join(__dirname, '..', 'uploads', image.name));
                        paths.push(path.join(__dirname, '..', 'uploads', image.name));
                        await writeStream.write(image.data);
                        await writeStream.end();
                }
                let images = await cloud.uploadImage(paths);
                if(req.body.listingTypeInput === 'Buy'){
                    try {
                        let listing = await listings.create(req.session.user.id, req.body.TitleInput, req.body.listingTypeInput, req.body.conditionInput, secCond, req.body.priceInput, images, validTrades, "0", req.body.shipMethodInput,  req.body.descriptionInput, "No Returns", "USD", req.body.pcIdInput);
                        let pathway = path.join(__dirname, '..', 'uploads');
                        console.log(listing);
                        fs.readdir(pathway, (err, files) => {
                            if (err) throw err;
                            for( let x of files){
                                if (x != "258.png"){
                                let filepath = path.join(pathway, x);
                                fs.unlink(filepath, err => {
                                    if (err) throw err;
                                });
                            }
                            }
                        });
                        res.redirect('/');
                    } catch (e) {
                        console.log(e.message);
                        res.status(500).render('createListing', {title: 'Create a Listing', error: 'Invalid Listing'})
                    }
                }
                else{
                    req.body.shippingPriceInput = xss(req.body.shippingPriceInput);
                    req.body.returnPolicyInput = xss(req.body.returnPolicyInput);
                    try {
                        let listing = await listings.create(req.session.user.id, req.body.TitleInput, req.body.listingTypeInput, req.body.conditionInput, secCond, req.body.priceInput, images, validTrades, req.body.shippingPriceInput, req.body.shipMethodInput,  req.body.descriptionInput, req.body.returnPolicyInput, "USD", req.body.pcIdInput);
                        let pathway = path.join(__dirname, '..', 'uploads');
                        console.log(listing);
                        fs.readdir(pathway, (err, files) => {
                            if (err) throw err;
                            for( let x of files){
                                if (x != "258.png"){
                                let filepath = path.join(pathway, x);
                                fs.unlink(filepath, err => {
                                    if (err) throw err;
                                });
                            }
                            }
                        });
                        res.redirect('/');
                    } catch (e) {
                        console.log(e.message);
                        res.status(500).render('createListing', {title: 'Create a Listing', error: 'Invalid Listing'})
                    }
                }
                
            }
        });

router.route('/createListing').get(async (req, res) => {
    try {
        res.render('createListing', {title: 'Create a Listing'});
    } catch (e) {
        res.status(500).json({error: e});
    }});

router.route('/logout').get(async (req, res) => {
    req.session.destroy();
    res.render('logout');
});

router.route('/review/:id').get(async (req, res) => {
    try {
        res.render('createReview');
    } catch (e) {
        res.status(500).json({error: e});
    }
}).post(async (req, res) => {
    req.body.contentInput = xss(req.body.contentInput);
    req.body.rating = xss(req.body.rating);
    
    if (typeof req.body.contentInput !== 'string') { res.status(400).render('createReview', {error: 'Review is not a string.'}); }
    req.body.contentInput = req.body.contentInput.trim();
    if (req.body.contentInput.length < 10 || req.body.contentInput.length > 5000) { 
        res.status(400).render('createReview', {error: 'Content must be between 10 and 5000 characters.'}); 
    }

    if (!helpers.validRating(req.body.rating)) {
        res.status(400).render('createReview', {error: 'Invalid rating.'});
    }

    /* Insert review into database */
    
    try {
        const insertedReview = await reviews.createReview(req.session.user.id, req.params.id, req.body.contentInput, req.body.rating);
        res.redirect('/account'); 
    } catch (e) {
        res.status(500).render('createReview', {error: e});
    }
    
});

router.route('/ProfilePage/:username').get(async (req, res) => {
    try {
        let info = await users.getUserByUsername(req.params.username);
        let reviews;
        if(info.reviewedBy.length > 0){
            reviews = [];
            for (let x of info.reviewedBy){
                let rev = {name: x[1], message: x[2], rating: x[3]};
                reviews.push(rev);
            }
        }
        res.render('profilePage', {title: info.username+'\'s Profile', user: info, reviews: reviews});
    } catch (e) {
        res.status(500).json({error: e});
    }});


 export default router;
