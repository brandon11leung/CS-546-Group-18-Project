
import session from 'express-session';
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + '/public');

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false,
}));

app.use('/account',async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.redirect('/login');
  }
});

app.use('/signup', async (req, res, next) => {
  if (req.session.user) {
    res.redirect('/listings');
  } else {
    next();
  }
})

app.use('/login', async (req, res, next) => {
  if (req.session.user) {
    res.redirect('/listings');
  } else {
    next();
  }
})

app.use('/createListing', async(req, res, next) => {
  if (req.session.user) {
    res.redirect('/login')
  } else {
    next();
  }
});



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
