module.exports = function GreetingFactory(names) {
    var namesGreeted = names || {};
    var username = "";
    var language = ""

    function setName(name) {
        username = name;
    }
    function setLanguage(lang) {
        language = lang;
    }
    function getName() {
        return username;
    }
    function getLanguage() {
        return language;
    }
    function greetInDiffLanguages(name, lang) {
        if (!lang) {
            return "First select the language "
        }
        var nameUpp = name.toUpperCase()

        if (namesGreeted[nameUpp] === undefined) {
            namesGreeted[nameUpp] = 0;
        }

        var upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
        setName(upperCaseName);
        setLanguage(language);

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
    function counter() {
        var countPeople = Object.keys(namesGreeted)
        return countPeople.length;

    }
    function getNames() {
        return namesGreeted;
    }
    return {

        greetInDiffLanguages,
        counter,
        getNames,
        setLanguage,
        setName,
        getLanguage,
        getName
    }
}
