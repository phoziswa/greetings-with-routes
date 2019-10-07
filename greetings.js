module.exports = function GreetingFactory(names) {
    var namesGreeted = names || {};
    let greetedUsers;

    function greetInDiffLanguages(name, lang) {
        if(!lang){
            return "First select the language "
        }
         var nameUpp = name.toUpperCase()

        if (namesGreeted[nameUpp] === undefined){
            namesGreeted[nameUpp] = 0;
        }
    
        var upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);

        if (lang === 'English') {
            return "Hello, " + upperCaseName;
        }
        else if (lang === 'isiXhosa') {
            return "Molo, " + upperCaseName;
        }
        else if (lang === 'Afrikaans') {
            return "Hallo, " + upperCaseName;
        }
    }
 function counter (){
     var countPeople = Object.keys(namesGreeted)
     return countPeople.length;

 }
 function getName() {
    return namesGreeted;
}
function getTheGreet(){
    return greetedUsers
}
    return {
       
        greetInDiffLanguages,
        counter,
        getName,
        getTheGreet
    }
}
