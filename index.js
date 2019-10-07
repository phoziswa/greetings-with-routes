const express = require('express');
const bodyParser = require('body-parser');
const GreetingFactory = require('./greetings');
const app = express();

const greetings = GreetingFactory();

const exphbs = require('express-handlebars');
const handlebarSetup = exphbs({

  partialsDir: "./views/partials",
  viewPath:  './views',
  layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  
    res.render('index', {
  
        allNames: greetings.getTheGreeted(),
      countingGreetedPeople: greetings.counter()
    
    });
  })
  app.post('/Greetings', function (req, res) {

    greetings.greetInDiffLanguages(req.body.inputUser, req.body.languages)

    res.redirect('/')
  });

const PORT = process.env.PORT || 3004;
app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
