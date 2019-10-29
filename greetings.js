module.exports = function GreetingFactory(pool) {
    var namesGreeted = {};
    var message = '';
    var data;
    var greet;

    async function greetInDiffLanguages(name, lang) {
        message = '';
        clear()
        var nameUpp = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        // data = await pool.query('select distinct greet_name greet_count from names_table;')

        if (nameUpp.length > 0) {
            var storeNAmes = await pool.query('SELECT * FROM names_table WHERE  greet_name = $1;', [nameUpp])

            if (storeNAmes.rowCount === 1) {
                await pool.query('UPDATE names_table greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1;', [nameUpp])
            }
            else {
                await pool.query('INSERT INTO names_table (greet_name, greet_count) values ($1, $2)', [nameUpp, 1]);
            }
        }

        if (lang === 'English') {
            message = "Hello, " + nameUpp;
        }
        else if (lang === 'isiXhosa') {
            message = "Molo, " + nameUpp;
        }
        else if (lang === 'Afrikaans') {
            message = "Hallo, " + nameUpp;
        }
        // console.log(message);
    }
    async function counter() {
        var countRows = await pool.query('SELECT COUNT (*) FROM names_table')
        return countRows.rows[0].count;
    }

    function getNames() {
        return namesGreeted;
    }

    async function getName(name) {

        let names = await pool.query("SELECT * FROM names_table where greet_name =$1", [name]);
        var user = names.rows[0];

        return user
    }

    function greetingMessage() {
        return message;
    };

    async function allData() {
        data = await pool.query('SELECT * FROM names_table;')
        return data.rows
    }
    function theGreet() {
        return greet;
    }

    function clear() {
        return ""
    }
    async function reset() {
        let clearData = await pool.query("DELETE FROM names_table;")
        greet = clear()
        return clearData;
    }
    return {

        greetInDiffLanguages,
        counter,
        getNames,
        greetingMessage,
        allData,
        reset,
        theGreet,
        getName
    }
}
