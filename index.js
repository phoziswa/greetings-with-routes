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

app.get('/', function (req, res){
  
    res.render('index', {
  
        
      theCounter: greetings.counter()
    
    });
  })
  app.post('/Greetings', function (req, res) {

   var message = ""
   var name = req.body.inputUser;
   var language = req.body.language;
   if(!name){
    message = "please enter name"
   }
   else if(!language){
     message = "pease enter the language"
   }
   else{
     message = greetings.greetInDiffLanguages(name, language)
   }
   
    res.render('index', {message})
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
