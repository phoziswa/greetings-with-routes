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
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const connectionString = 'postgresql://codex:codex123@localhost:5432/names_greeted';

const pool = new Pool({
  connectionString,
  ssl : useSSL
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

app.get('/', async function (req, res) {

  res.render('index', {
    theCounter: await greetings.counter(),
    message: await greetings.greetingMessage()

  });
})
app.post('/greet', async function (req, res) {

  var name = req.body.inputUser;
  var lang = req.body.language;

  if (!name) {
    req.flash("info", "please enter name")

    res.render('index', {
      message: await greetings.greetingMessage(),
      message: ''
    });
  }
  else if (lang === undefined) {
    req.flash("info", "please select the language")

    res.render('index', {
      message: await greetings.greetingMessage(),
      message: ''
    });
  }
  else {
    await greetings.greetInDiffLanguages(name, lang)
    var greetMessege = await greetings.greetingMessage()

    res.render('index', {
      theCounter: await greetings.counter(),
      message: greetMessege

    });
  }
});

app.get("/greeted", async function (req, res) {
  res.render("actions", {
    actions: await greetings.allData()
  });
});

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});
