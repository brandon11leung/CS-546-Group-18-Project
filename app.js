
import session from 'express-session';
import express from 'express';
import fileUpload from 'express-fileupload';
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
app.use(fileUpload());

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false,
}));


app.use('/account', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next(); 
  }
});

// app.post('/upload', (req, res) => {
//   console.log(req.files);
//   for(let x of req.files.imageInput){
//     const image = x;
//     //image.mv(__dirname + '/upload/' + image.name);
//     const writeStream = fs.createWriteStream(__dirname + '/uploads/' + image.name);
//     writeStream.write(image.data);
//   }
// });


// app.use('/createListing', async(req, res, next) => {
//   if (req.session.user) {
//     res.redirect('/login')
//   } else {
//     next();
//   }
// });

// app.use('/login', async (req, res, next) => {
//   if (req.session.user) {
//     res.redirect('/listings');
//   } else {
//     next();
//   }
// });

// app.use('/signup', async (req, res, next) => {
//   if (req.session.user) {
//     res.redirect('/listings');
//   } else {
//     next();
//   }
// })






configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
