const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const PORT = process.env.PORT || 3213;
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/names_greeted';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const GreetingFactory = require('./greetings');


const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

// which db connection to use



const greetings = GreetingFactory(pool);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(flash());

app.get('/', async function (req, res, next) {
    let counter = await greetings.counter();
    let greet = await greetings.greetingMessage();
    res.render('index', {
      theCounter: counter,
      message: greet
    });
})
app.post('/greet', async function (req, res, next) {
  var name = req.body.inputUser;
  var lang = req.body.language;

  if (!name) {
    req.flash("info", "please enter name");
  }
  else if (lang === undefined) {
    req.flash("info", "please select the language")
  }
  else {
    await greetings.greetInDiffLanguages(name, lang)
  }
  res.redirect('/')

});

app.get("/greeted", async function (req, res) {
  let all_names = await greetings.allData();
  res.render("actions", {
    actions: all_names,
  });
});

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});
